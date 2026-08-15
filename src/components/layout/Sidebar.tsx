import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Target, Briefcase, CheckSquare,
  MessageSquare, BarChart3, Settings, Plus,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const SECTIONS = [
  {
    title: null,
    items: [{ to: '/app', label: 'الرئيسية', icon: LayoutDashboard, end: true }],
  },
  {
    title: 'CRM',
    items: [
      { to: '/app/contacts', label: 'العملاء', icon: Users },
      { to: '/app/leads', label: 'العملاء المحتملون', icon: Target },
      { to: '/app/pipeline', label: 'الصفقات', icon: Briefcase },
    ],
  },
  {
    title: 'العمل',
    items: [{ to: '/app/tasks', label: 'المهام', icon: CheckSquare }],
  },
  {
    title: 'التواصل',
    items: [{ to: '/app/inbox', label: 'Inbox', icon: MessageSquare }],
  },
  {
    title: 'التحليل',
    items: [{ to: '/app/reports', label: 'التقارير', icon: BarChart3 }],
  },
  {
    title: 'الإدارة',
    items: [{ to: '/app/settings', label: 'الإعدادات', icon: Settings }],
  },
]

export function Sidebar({ onQuickAdd }: { onQuickAdd: () => void }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-l border-border bg-white md:flex">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">K</div>
        <span className="text-base font-bold text-text">CRM.KAI</span>
      </div>

      <div className="px-3">
        <button
          onClick={onQuickAdd}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-primary hover:brightness-95"
        >
          <Plus size={16} /> إضافة
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {SECTIONS.map((section, i) => (
          <div key={i}>
            {section.title && (
              <div className="px-2 pb-1 text-xs font-semibold text-muted">{section.title}</div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={'end' in item ? item.end : false}
                  className={({ isActive }) =>
                    cn(
                      'focus-ring flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                      isActive ? 'bg-primary/10 text-primary' : 'text-text hover:bg-[#F2F4F7]'
                    )
                  }
                >
                  <item.icon size={17} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
