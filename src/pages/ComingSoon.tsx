export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center justify-center p-10">
      <div className="text-center">
        <div className="text-base font-semibold text-text">{title}</div>
        <div className="mt-1 text-sm text-muted">هذا القسم قيد التطوير في المرحلة القادمة.</div>
      </div>
    </div>
  )
}
