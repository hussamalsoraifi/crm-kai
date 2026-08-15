import { cn } from '../../lib/utils'

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-[#ECFDF3] text-[#12B76A]',
  inactive: 'bg-[#F2F4F7] text-[#667085]',
  new: 'bg-[#F2F4F7] text-[#667085]',
  contacted: 'bg-[#FFF6E5] text-[#EDB20F]',
  interested: 'bg-[#FFF6E5] text-[#EDB20F]',
  proposal: 'bg-[#FEF3E7] text-[#F79009]',
  won: 'bg-[#ECFDF3] text-[#12B76A]',
  lost: 'bg-[#FEF3F2] text-[#F04438]',
  pending: 'bg-[#F2F4F7] text-[#667085]',
  in_progress: 'bg-[#FFF6E5] text-[#EDB20F]',
  completed: 'bg-[#ECFDF3] text-[#12B76A]',
  cancelled: 'bg-[#FEF3F2] text-[#F04438]',
  low: 'bg-[#F2F4F7] text-[#667085]',
  medium: 'bg-[#FFF6E5] text-[#EDB20F]',
  high: 'bg-[#FEF3E7] text-[#F79009]',
  urgent: 'bg-[#FEF3F2] text-[#F04438]',
}

const STATUS_LABELS: Record<string, string> = {
  active: 'نشط', inactive: 'غير نشط', archived: 'مؤرشف',
  new: 'جديد', contacted: 'تم التواصل', interested: 'مهتم', proposal: 'عرض سعر', won: 'مغلق (رابح)', lost: 'مغلق (خاسر)',
  pending: 'قيد الانتظار', in_progress: 'قيد التنفيذ', completed: 'مكتملة', cancelled: 'ملغاة',
  low: 'منخفضة', medium: 'متوسطة', high: 'مرتفعة', urgent: 'عاجلة',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', STATUS_STYLES[status] ?? 'bg-[#F2F4F7] text-[#667085]')}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

export function Avatar({ name, size = 32 }: { name: string | null | undefined; size?: number }) {
  const initials = (name ?? '؟').trim().split(' ').slice(0, 2).map((p) => p[0]).join('')
  return (
    <div
      className="flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  )
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-white/50 px-6 py-14 text-center">
      {icon}
      <div className="text-sm font-medium text-text">{title}</div>
      {description && <div className="max-w-xs text-sm text-muted">{description}</div>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="focus-ring mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export function SkeletonRow({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-[#EAECF0]', className)} />
}
