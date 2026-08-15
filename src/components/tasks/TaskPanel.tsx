import { PanelShell, PanelSection } from '../layout/PanelShell'
import { useTasks, useCompleteTask } from '../../hooks/useTasks'
import { StatusBadge } from '../shared/Shared'
import { toast } from 'sonner'

export function TaskPanel({ taskId, onClose }: { taskId: string; onClose: () => void }) {
  const { data: tasks } = useTasks()
  const task = tasks?.find((t) => t.id === taskId)
  const complete = useCompleteTask()

  return (
    <PanelShell title={task?.title ?? '...'} subtitle={(task as any)?.contacts?.full_name} onClose={onClose}>
      {task && (
        <PanelSection>
          <div className="flex items-center gap-2">
            <StatusBadge status={task.status} />
            <StatusBadge status={task.priority} />
          </div>
          {task.due_date && (
            <div className="mt-3 text-sm text-muted">
              الموعد: {new Date(task.due_date).toLocaleString('ar-IQ', { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          )}
          {task.status !== 'completed' && (
            <button
              onClick={() =>
                complete.mutate(task.id, {
                  onSuccess: () => toast.success('تم إكمال المهمة'),
                  onError: () => toast.error('حدث خطأ أثناء إكمال المهمة'),
                })
              }
              disabled={complete.isPending}
              className="focus-ring mt-4 w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              إكمال المهمة
            </button>
          )}
        </PanelSection>
      )}
    </PanelShell>
  )
}
