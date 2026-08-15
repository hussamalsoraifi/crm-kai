import { useNavigate } from 'react-router-dom'
import { Users, Target, Briefcase, CheckSquare } from 'lucide-react'
import { useDashboardStats, useOrgActivities } from '../hooks/useActivities'
import { useTasks } from '../hooks/useTasks'
import { useAuth } from '../context/AuthContext'
import { SkeletonRow, StatusBadge } from '../components/shared/Shared'
import { formatCurrency, formatRelativeTime } from '../lib/utils'

export function Dashboard() {
  const { user } = useAuth()
  const { data: stats, isLoading } = useDashboardStats()
  const { data: activities } = useOrgActivities()
  const { data: tasks } = useTasks()
  const navigate = useNavigate()

  const myPendingTasks = (tasks ?? []).filter((t) => t.status !== 'completed' && t.status !== 'cancelled').slice(0, 5)

  const cards = [
    { label: 'العملاء', value: stats?.total_contacts, icon: Users, to: '/app/contacts' },
    { label: 'Leads جديدة', value: stats?.new_leads, icon: Target, to: '/app/leads' },
    { label: 'الصفقات المفتوحة', value: stats?.open_deals, icon: Briefcase, to: '/app/pipeline' },
    { label: 'مهامي اليوم', value: stats?.my_pending_tasks, icon: CheckSquare, to: '/app/tasks' },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-xl font-bold text-text">
          {greeting()}، {user?.email?.split('@')[0] ?? ''} 👋
        </h1>
        <p className="text-sm text-muted">إليك ملخص عملك اليوم.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => navigate(c.to)}
            className="focus-ring rounded-xl border border-border bg-white p-4 text-right shadow-sm transition hover:shadow-md"
          >
            <c.icon size={18} className="text-primary" />
            <div className="mt-2 text-2xl font-bold text-text">
              {isLoading ? <SkeletonRow className="h-7 w-10" /> : c.value ?? 0}
            </div>
            <div className="text-sm text-muted">{c.label}</div>
          </button>
        ))}
      </div>

      {!isLoading && (stats?.overdue_tasks ?? 0) > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-[#FEDF89] bg-[#FFFAEB] px-4 py-3 text-sm text-[#B54708]">
          ⚠ لديك {stats?.overdue_tasks} مهام متأخرة تحتاج متابعة.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text">مهامي اليوم</h2>
            <button onClick={() => navigate('/app/tasks')} className="text-xs font-medium text-primary">عرض الكل</button>
          </div>
          {!tasks ? (
            <SkeletonRow className="h-24" />
          ) : myPendingTasks.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted">لا توجد مهام معلقة 🎉</div>
          ) : (
            <div className="space-y-2">
              {myPendingTasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => navigate(`/app/tasks?panel=task&id=${t.id}`)}
                  className="focus-ring flex w-full items-center justify-between rounded-lg px-2 py-2 text-right text-sm hover:bg-[#F7F8FA]"
                >
                  <span className="text-text">{t.title}</span>
                  <StatusBadge status={t.priority} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-text">آخر النشاطات</h2>
          {!activities ? (
            <SkeletonRow className="h-24" />
          ) : activities.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted">لا يوجد نشاط بعد.</div>
          ) : (
            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a.id} className="text-sm">
                  <div className="text-text">{a.title || a.description || a.type}</div>
                  <div className="text-xs text-muted">{formatRelativeTime(a.created_at)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {stats && (
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="text-sm text-muted">إجمالي قيمة الصفقات المفتوحة</div>
          <div className="text-xl font-bold text-primary">{formatCurrency(Number(stats.total_deal_value ?? 0))}</div>
        </div>
      )}
    </div>
  )
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'صباح الخير'
  if (h < 17) return 'مساء الخير'
  return 'مساء الخير'
}
