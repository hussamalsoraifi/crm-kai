import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Users, Search } from 'lucide-react'
import { useContacts } from '../hooks/useContacts'
import { StatusBadge, SkeletonRow, EmptyState, Avatar } from '../components/shared/Shared'
import { ContactFormModal } from '../components/contacts/ContactFormModal'

export function ContactsView() {
  const { data: contacts, isLoading } = useContacts()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const filtered = (contacts ?? []).filter((c) =>
    (c.full_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (c.company ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-text">العملاء</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="focus-ring flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus size={16} /> إضافة عميل
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث..."
          className="focus-ring w-full rounded-lg border border-border bg-white py-2 pr-9 pl-3 text-sm"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {isLoading ? (
          <div className="space-y-2 p-4">{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} className="h-10" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-2">
            <EmptyState
              icon={<Users size={28} className="text-muted" />}
              title="لا يوجد عملاء حتى الآن"
              description="أضف أول عميل وابدأ بإدارة علاقاتك."
              actionLabel="+ إضافة عميل"
              onAction={() => setModalOpen(true)}
            />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-[#F7F8FA] text-right text-xs font-semibold text-muted">
                <th className="px-4 py-3">العميل</th>
                <th className="px-4 py-3">الهاتف</th>
                <th className="px-4 py-3">الشركة</th>
                <th className="px-4 py-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/app/contacts?panel=contact&id=${c.id}`)}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-[#F7F8FA]"
                >
                  <td className="flex items-center gap-2.5 px-4 py-3">
                    <Avatar name={c.full_name} size={28} />
                    <span className="font-medium text-text">{c.full_name}</span>
                  </td>
                  <td className="px-4 py-3 text-muted" dir="ltr">{c.phone ?? '—'}</td>
                  <td className="px-4 py-3 text-muted">{c.company ?? '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && <ContactFormModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
