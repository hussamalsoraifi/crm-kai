import { useEffect, useRef, useState } from 'react'
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react'
import { useOrganization } from '../../context/OrganizationContext'
import { useAuth } from '../../context/AuthContext'
import { useGlobalSearch } from '../../hooks/useGlobalSearch'
import { Avatar } from '../shared/Shared'
import { useNavigate } from 'react-router-dom'

export function TopBar() {
  const { organizations, currentOrganization, setCurrentOrganizationId } = useOrganization()
  const { user, signOut } = useAuth()
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { data: results } = useGlobalSearch(query)
  const [searchOpen, setSearchOpen] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-white px-5">
      <div className="relative">
        <button
          onClick={() => setSwitcherOpen((v) => !v)}
          className="focus-ring flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-text hover:bg-[#F2F4F7]"
        >
          {currentOrganization?.name ?? '...'}
          <ChevronDown size={15} />
        </button>
        {switcherOpen && (
          <div className="absolute top-full right-0 z-30 mt-1 w-56 rounded-lg border border-border bg-white p-1 shadow-lg">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted">مساحات العمل</div>
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => { setCurrentOrganizationId(org.id); setSwitcherOpen(false) }}
                className="focus-ring flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-[#F2F4F7]"
              >
                {org.id === currentOrganization?.id ? '✓' : <span className="w-3.5" />} {org.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={searchRef} className="relative flex-1 max-w-md">
        <Search size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onFocus={() => setSearchOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن عميل، صفقة، مهمة أو محادثة..."
          className="focus-ring w-full rounded-lg border border-border bg-[#F7F8FA] py-2 pr-9 pl-3 text-sm placeholder:text-muted"
        />
        {searchOpen && query.length >= 2 && (
          <div className="absolute top-full right-0 z-30 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-border bg-white p-2 shadow-lg">
            {!results || (results.contacts.length === 0 && results.deals.length === 0 && results.tasks.length === 0) ? (
              <div className="px-2 py-3 text-sm text-muted">لا توجد نتائج</div>
            ) : (
              <>
                {results.contacts.length > 0 && (
                  <SearchGroup title="العملاء" items={results.contacts.map((c) => ({ id: c.id, label: c.full_name ?? '' }))}
                    onSelect={(id) => { navigate(`/app/contacts?panel=contact&id=${id}`); setSearchOpen(false) }} />
                )}
                {results.deals.length > 0 && (
                  <SearchGroup title="الصفقات" items={results.deals.map((d) => ({ id: d.id, label: d.title }))}
                    onSelect={(id) => { navigate(`/app/pipeline?panel=deal&id=${id}`); setSearchOpen(false) }} />
                )}
                {results.tasks.length > 0 && (
                  <SearchGroup title="المهام" items={results.tasks.map((t) => ({ id: t.id, label: t.title }))}
                    onSelect={(id) => { navigate(`/app/tasks?panel=task&id=${id}`); setSearchOpen(false) }} />
                )}
              </>
            )}
          </div>
        )}
      </div>

      <button className="focus-ring relative rounded-lg p-2 text-muted hover:bg-[#F2F4F7]" aria-label="الإشعارات">
        <Bell size={19} />
      </button>

      <div className="relative">
        <button onClick={() => setUserMenuOpen((v) => !v)} className="focus-ring flex items-center gap-2 rounded-lg p-1 hover:bg-[#F2F4F7]">
          <Avatar name={user?.email ?? ''} size={30} />
        </button>
        {userMenuOpen && (
          <div className="absolute top-full left-0 z-30 mt-1 w-48 rounded-lg border border-border bg-white p-1 shadow-lg">
            <div className="truncate px-2 py-1.5 text-xs text-muted">{user?.email}</div>
            <button onClick={signOut} className="focus-ring flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-danger hover:bg-[#FEF3F2]">
              <LogOut size={15} /> تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

function SearchGroup({ title, items, onSelect }: { title: string; items: { id: string; label: string }[]; onSelect: (id: string) => void }) {
  return (
    <div className="mb-1">
      <div className="px-2 py-1 text-xs font-semibold text-muted">{title}</div>
      {items.map((item) => (
        <button key={item.id} onClick={() => onSelect(item.id)} className="focus-ring block w-full rounded-md px-2 py-1.5 text-right text-sm hover:bg-[#F2F4F7]">
          {item.label}
        </button>
      ))}
    </div>
  )
}
