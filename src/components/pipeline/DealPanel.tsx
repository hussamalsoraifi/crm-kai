import { PanelShell, PanelSection } from '../layout/PanelShell'
import { useDeals, usePipeline } from '../../hooks/useDeals'
import { formatCurrency } from '../../lib/utils'
import { useContactActivities } from '../../hooks/useActivities'
import { formatRelativeTime } from '../../lib/utils'

export function DealPanel({ dealId, onClose }: { dealId: string; onClose: () => void }) {
  const { data: deals } = useDeals()
  const { data: pipelineData } = usePipeline()
  const deal = deals?.find((d) => d.id === dealId)
  const stage = pipelineData?.stages.find((s) => s.id === deal?.stage_id)
  const { data: activities } = useContactActivities(deal?.contact_id ?? null)
  const dealActivities = activities?.filter((a) => a.type.startsWith('deal') || a.type === 'note_added')

  return (
    <PanelShell title={deal?.title ?? '...'} subtitle={(deal as any)?.contacts?.full_name} onClose={onClose}>
      {deal && (
        <>
          <PanelSection>
            <div className="text-2xl font-bold text-primary">{formatCurrency(deal.value, deal.currency ?? 'IQD')}</div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted">المرحلة</span>
              <span className="font-medium text-text">{stage?.name}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-muted">احتمالية الإغلاق</span>
              <span className="font-medium text-text">{stage?.probability}%</span>
            </div>
          </PanelSection>
          <PanelSection title="Timeline">
            {!dealActivities || dealActivities.length === 0 ? (
              <div className="text-sm text-muted">لا يوجد نشاط بعد.</div>
            ) : (
              <div className="space-y-3">
                {dealActivities.map((a) => (
                  <div key={a.id} className="text-sm">
                    <div className="text-text">{a.title || a.description}</div>
                    <div className="text-xs text-muted">{formatRelativeTime(a.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </PanelSection>
        </>
      )}
    </PanelShell>
  )
}
