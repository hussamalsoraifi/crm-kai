import { useState } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { ContextPanelHost } from './ContextPanelHost'
import { QuickAddMenu } from './QuickAddMenu'
import { useOrganization } from '../../context/OrganizationContext'
import { SkeletonRow } from '../shared/Shared'

export function AppShell() {
  const { currentOrganization, isLoading } = useOrganization()
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const panelOpen = !!searchParams.get('panel')

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><SkeletonRow className="h-8 w-40" /></div>
  }

  if (!currentOrganization) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted">
        لا توجد مساحة عمل مرتبطة بحسابك بعد.
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar onQuickAdd={() => setQuickAddOpen(true)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto">
            <Outlet />
          </main>
          {panelOpen && <ContextPanelHost />}
        </div>
      </div>
      {quickAddOpen && <QuickAddMenu onClose={() => setQuickAddOpen(false)} />}
    </div>
  )
}
