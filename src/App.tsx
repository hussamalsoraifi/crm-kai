import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import { OrganizationProvider } from './context/OrganizationContext'
import { AppShell } from './components/layout/AppShell'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { ContactsView } from './pages/ContactsView'
import { PipelineView } from './pages/PipelineView'
import { TasksView } from './pages/TasksView'
import { ComingSoon } from './pages/ComingSoon'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
})

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex h-screen items-center justify-center text-sm text-muted">...جارِ التحميل</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <OrganizationProvider>
              <AppShell />
            </OrganizationProvider>
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="contacts" element={<ContactsView />} />
        <Route path="leads" element={<ComingSoon title="العملاء المحتملون" />} />
        <Route path="pipeline" element={<PipelineView />} />
        <Route path="tasks" element={<TasksView />} />
        <Route path="inbox" element={<ComingSoon title="Inbox" />} />
        <Route path="reports" element={<ComingSoon title="التقارير" />} />
        <Route path="settings" element={<ComingSoon title="الإعدادات" />} />
      </Route>
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster position="top-center" richColors dir="rtl" />
      </AuthProvider>
    </QueryClientProvider>
  )
}
