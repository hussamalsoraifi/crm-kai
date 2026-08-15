import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | null, currency = 'IQD') {
  if (value == null) return '—'
  return new Intl.NumberFormat('ar-IQ').format(value) + ' ' + currency
}

export function formatRelativeTime(dateStr: string | null) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.round(diffMs / 60000)
  if (diffMin < 1) return 'الآن'
  if (diffMin < 60) return `قبل ${diffMin} دقيقة`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `قبل ${diffHr} ساعة`
  const diffDay = Math.round(diffHr / 24)
  return `قبل ${diffDay} يوم`
}
