import { useState } from 'react'
import { User, CheckSquare } from 'lucide-react'
import { ContactFormModal } from '../contacts/ContactFormModal'
import { TaskFormModal } from '../tasks/TaskFormModal'

export function QuickAddMenu({ onClose }: { onClose: () => void }) {
  const [openForm, setOpenForm] = useState<'contact' | 'task' | null>(null)

  if (openForm === 'contact') return <ContactFormModal onClose={() => { setOpenForm(null); onClose() }} />
  if (openForm === 'task') return <TaskFormModal onClose={() => { setOpenForm(null); onClose() }} />

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-64 rounded-xl border border-border bg-white p-1.5 shadow-2xl">
        <button onClick={() => setOpenForm('contact')} className="focus-ring flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm hover:bg-[#F2F4F7]">
          <User size={16} className="text-primary" /> عميل جديد
        </button>
        <button onClick={() => setOpenForm('task')} className="focus-ring flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm hover:bg-[#F2F4F7]">
          <CheckSquare size={16} className="text-primary" /> مهمة جديدة
        </button>
      </div>
    </div>
  )
}
