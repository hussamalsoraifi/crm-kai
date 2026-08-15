import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { useTasks, useCompleteTask } from '../hooks/useTasks'
import { StatusBadge, SkeletonRow, EmptyState } from '../components/shared/Shared'
import { toast } from 'sonner'

const TABS = [
  { key: 'today', label: 'اليوم' },
  { key: 'upcoming', label: 'القادمة' },
  { key: 'overdue', label: 'المتأخرة' },
  { key: 'completed', label: 'مكتملة' },
  { key: 'all', label: 'كل المهام' },
] as const

export function TasksView() {
  const { data: tasks, isLoading } = useTasks()
  const complete = useCompleteTask()
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('today')
  const navigate = useNavigate()

  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay = new Date(startOfDay.getTime() + 86400000)

  const filtered = (tasks ?? []).filter((t) => {
    const due = t.due_date ? new Date(t.due_date) : null
    switch (tab) {
      case 'today': return t.status !== 'completed' && due && due >= startOfDay && due < endOfDay
      case 'upcoming': return t.status !== 'completed' && due && due >= endOfDay
      case 'overdue': return t.status !== 'completed' && due && due < startOfDay
      case 'completed': return t.status === 'completed'
      default: return true
    }
  })

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-lg font-bold text-text">مهامي</h1>

      <div className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`focus-ring border-b-2 px-3 py-2 text-sm font-medium ${
              tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} className="h-14" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState title="لا توجد مهام في هذا القسم" />
      ) : (
        <div className="space-y-2">
          {filtered.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border bg-white p-3 shadow-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (t.status === 'completed') return
                  complete.mutate(t.id, { onSuccess: () => toast.success('تم إكمال المهمة') })
                }}
                className="focus-ring text-primary"
              >
                {t.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={20} className="text-muted" />}
              </button>
              <div className="flex-1 cursor-pointer" onClick={() => navigate(`/app/tasks?panel=task&id=${t.id}`)}>
                <div className={`text-sm font-medium ${t.status === 'completed' ? 'text-muted line-through' : 'text-text'}`}>{t.title}</div>
                <div className="text-xs text-muted">
                  {(t as any).contacts?.full_name}
                  {t.due_date && ' · ' + new Date(t.due_date).toLocaleString('ar-IQ', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
              <StatusBadge status={t.priority} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
