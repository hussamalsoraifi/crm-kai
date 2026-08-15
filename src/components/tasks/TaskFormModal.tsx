import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useCreateTask } from '../../hooks/useTasks'
import { useContacts } from '../../hooks/useContacts'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'

const schema = z.object({
  title: z.string().min(1, 'العنوان مطلوب'),
  due_date: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  contact_id: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export function TaskFormModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'medium' },
  })
  const { data: contacts } = useContacts()
  const { user } = useAuth()
  const createTask = useCreateTask()

  async function onSubmit(values: FormValues) {
    try {
      await createTask.mutateAsync({
        title: values.title,
        priority: values.priority,
        due_date: values.due_date ? new Date(values.due_date).toISOString() : null,
        contact_id: values.contact_id || null,
        assigned_to: user?.id ?? null,
        created_by: user?.id ?? null,
      })
      toast.success('تم إنشاء المهمة بنجاح')
      onClose()
    } catch {
      toast.error('حدث خطأ أثناء حفظ البيانات، حاول مرة أخرى')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-text">مهمة جديدة</h2>
          <button onClick={onClose} className="focus-ring rounded-lg p-1.5 text-muted hover:bg-[#F2F4F7]"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-5">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">العنوان *</span>
            <input {...register('title')} className="input" />
            {errors.title && <span className="mt-1 block text-xs text-danger">{errors.title.message}</span>}
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">الموعد</span>
            <input type="datetime-local" {...register('due_date')} className="input" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">الأولوية</span>
            <select {...register('priority')} className="input">
              <option value="low">منخفضة</option>
              <option value="medium">متوسطة</option>
              <option value="high">مرتفعة</option>
              <option value="urgent">عاجلة</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">العميل المرتبط</span>
            <select {...register('contact_id')} className="input">
              <option value="">بدون</option>
              {contacts?.map((c) => <option key={c.id} value={c.id}>{c.full_name}</option>)}
            </select>
          </label>
          <button type="submit" disabled={isSubmitting} className="focus-ring mt-2 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white disabled:opacity-50">
            {isSubmitting ? 'جارِ الحفظ...' : 'حفظ المهمة'}
          </button>
        </form>
      </div>
    </div>
  )
}
