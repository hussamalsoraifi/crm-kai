import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function PanelShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string
  subtitle?: ReactNode
  onClose: () => void
  children: ReactNode
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-full max-w-sm flex-col border-l border-border bg-white shadow-2xl md:static md:z-auto md:shadow-none md:w-80 lg:w-96">
      <div className="flex items-start justify-between border-b border-border px-5 py-4">
        <div>
          <div className="text-base font-bold text-text">{title}</div>
          {subtitle && <div className="text-sm text-muted">{subtitle}</div>}
        </div>
        <button onClick={onClose} className="focus-ring rounded-lg p-1.5 text-muted hover:bg-[#F2F4F7]" aria-label="إغلاق">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </aside>
  )
}

export function PanelSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="border-b border-border px-5 py-4">
      {title && <div className="mb-2 text-xs font-semibold text-muted">{title}</div>}
      {children}
    </div>
  )
}
