import { DndContext, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core'
import { useNavigate } from 'react-router-dom'
import { usePipeline, useDeals, useMoveDeal } from '../hooks/useDeals'
import { formatCurrency } from '../lib/utils'
import { Avatar, SkeletonRow } from '../components/shared/Shared'
import { toast } from 'sonner'

export function PipelineView() {
  const { data: pipelineData, isLoading: loadingPipeline } = usePipeline()
  const { data: deals, isLoading: loadingDeals } = useDeals()
  const moveDeal = useMoveDeal()
  const navigate = useNavigate()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const dealId = active.id as string
    const newStageId = over.id as string
    const deal = deals?.find((d) => d.id === dealId)
    if (!deal || deal.stage_id === newStageId) return
    moveDeal.mutate({ dealId, stageId: newStageId }, {
      onError: () => toast.error('حدث خطأ أثناء نقل الصفقة'),
    })
  }

  if (loadingPipeline || loadingDeals) {
    return <div className="p-6"><SkeletonRow className="h-96" /></div>
  }

  return (
    <div className="h-full overflow-x-auto p-6">
      <h1 className="mb-4 text-lg font-bold text-text">Pipeline</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {pipelineData?.stages.map((stage) => {
            const stageDeals = (deals ?? []).filter((d) => d.stage_id === stage.id)
            const total = stageDeals.reduce((sum, d) => sum + (d.value ?? 0), 0)
            return (
              <StageColumn key={stage.id} stageId={stage.id}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color ?? '#667085' }} />
                    <span className="text-sm font-semibold text-text">{stage.name}</span>
                    <span className="text-xs text-muted">{stageDeals.length}</span>
                  </div>
                </div>
                <div className="mb-2 text-xs text-muted">{formatCurrency(total)}</div>
                <div className="space-y-2">
                  {stageDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} onClick={() => navigate(`/app/pipeline?panel=deal&id=${deal.id}`)} />
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted">
                      لا توجد صفقات في هذه المرحلة.
                    </div>
                  )}
                </div>
              </StageColumn>
            )
          })}
        </div>
      </DndContext>
    </div>
  )
}

function StageColumn({ stageId, children }: { stageId: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: stageId })
  return (
    <div
      ref={setNodeRef}
      className={`w-72 shrink-0 rounded-xl border p-3 transition-colors ${isOver ? 'border-primary bg-primary/5' : 'border-border bg-[#F7F8FA]'}`}
    >
      {children}
    </div>
  )
}

function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: deal.id })
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 10 } : undefined
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`cursor-pointer rounded-lg border border-border bg-white p-3 shadow-sm hover:shadow-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="text-sm font-medium text-text">{deal.title}</div>
      <div className="mt-0.5 text-xs text-muted">{deal.contacts?.full_name}</div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">{formatCurrency(deal.value, deal.currency)}</span>
        <Avatar name={deal.contacts?.full_name} size={22} />
      </div>
    </div>
  )
}
