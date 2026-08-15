import { useState } from 'react'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { PanelShell, PanelSection } from '../layout/PanelShell'
import { useContact } from '../../hooks/useContacts'
import { useContactActivities, useCreateNote } from '../../hooks/useActivities'
import { StatusBadge, SkeletonRow, Avatar } from '../shared/Shared'
import { formatRelativeTime } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'

const ACTIVITY_ICON: Record<string, string> = {
  contact_created: '👤', lead_created: '🎯', deal_created: '💰', deal_stage_changed: '🔄',
  task_created: '✅', task_completed: '✅', note_added: '📝', message_sent: '💬', message_received: '💬',
}

export function ContactPanel({ contactId, onClose }: { contactId: string; onClose: () => void }) {
  const { data: contact, isLoading } = useContact(contactId)
  const { data: activities } = useContactActivities(contactId)
  const { user } = useAuth()
  const createNote = useCreateNote()
  const [noteText, setNoteText] = useState('')

  function submitNote() {
    if (!noteText.trim() || !user) return
    createNote.mutate(
      { content: noteText.trim(), contact_id: contactId, created_by: user.id },
      {
        onSuccess: () => { setNoteText(''); toast.success('تمت إضافة الملاحظة') },
        onError: () => toast.error('حدث خطأ أثناء حفظ الملاحظة'),
      }
    )
  }

  return (
    <PanelShell title={contact?.full_name ?? '...'} subtitle={contact ? <StatusBadge status={contact.status} /> : undefined} onClose={onClose}>
      {isLoading || !contact ? (
        <div className="space-y-2 p-5"><SkeletonRow className="h-4 w-3/4" /><SkeletonRow className="h-4 w-1/2" /></div>
      ) : (
        <>
          <PanelSection>
            <div className="flex items-center gap-3">
              <Avatar name={contact.full_name} size={44} />
              <div>
                <div className="font-semibold text-text">{contact.full_name}</div>
                {contact.company && <div className="text-sm text-muted">{contact.company}</div>}
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-text">
              {contact.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-muted" /> {contact.phone}</div>}
              {contact.email && <div className="flex items-center gap-2"><Mail size={14} className="text-muted" /> {contact.email}</div>}
            </div>
            {contact.phone && (
              <a
                href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank" rel="noreferrer"
                className="focus-ring mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#12B76A] px-3 py-2 text-sm font-medium text-white hover:brightness-95"
              >
                <MessageCircle size={15} /> واتساب
              </a>
            )}
          </PanelSection>

          <PanelSection title="إضافة ملاحظة">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="اكتب ملاحظة عن هذا العميل..."
              rows={2}
              className="focus-ring w-full resize-none rounded-lg border border-border p-2 text-sm"
            />
            <button
              onClick={submitNote}
              disabled={!noteText.trim() || createNote.isPending}
              className="focus-ring mt-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white disabled:opacity-40"
            >
              حفظ الملاحظة
            </button>
          </PanelSection>

          <PanelSection title="Timeline">
            {!activities || activities.length === 0 ? (
              <div className="text-sm text-muted">لا يوجد نشاط بعد.</div>
            ) : (
              <div className="space-y-3">
                {activities.map((a) => (
                  <div key={a.id} className="flex gap-2 text-sm">
                    <span>{ACTIVITY_ICON[a.type] ?? '•'}</span>
                    <div>
                      <div className="text-text">{a.title || a.description || a.type}</div>
                      <div className="text-xs text-muted">{formatRelativeTime(a.created_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </PanelSection>
        </>
      )}
    </PanelShell>
  )
}
