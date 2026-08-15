import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { user, signIn } = useAuth()
  const [email, setEmail] = useState('hussam@kaimarketing.test')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/app" replace />

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">K</div>
          <span className="text-lg font-bold text-text">CRM.KAI</span>
        </div>
        <h1 className="mb-1 text-base font-semibold text-text">تسجيل الدخول</h1>
        <p className="mb-5 text-sm text-muted">كل أعمالك في شاشة واحدة.</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">البريد الإلكتروني</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" dir="ltr" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">كلمة المرور</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" dir="ltr" />
          </label>
          {error && <div className="text-xs text-danger">{error}</div>}
          <button type="submit" disabled={loading} className="focus-ring w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white disabled:opacity-50">
            {loading ? 'جارِ الدخول...' : 'دخول'}
          </button>
        </form>
        <p className="mt-4 text-xs text-muted">
          بيانات تجريبية: hussam@kaimarketing.test — Password123!
        </p>
      </div>
    </div>
  )
}
