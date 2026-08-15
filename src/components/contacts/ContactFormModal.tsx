import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useCreateContact } from '../../hooks/useContacts'
import { toast } from 'sonner'

const schema = z.object({
  first_name: z.string().min(1, 'الاسم مطلوب'),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('بريد إلكتروني غير صالح').optional().or(z.literal('')),
  company: z.string().optional(),
  source: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function ContactFormModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const createContact = useCreateContact()

  async function onSubmit(values: FormValues) {
    try {
      await createContact.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name || null,
        full_name: `${values.first_name} ${values.last_name ?? ''}`.trim(),
        phone: values.phone || null,
        email: values.email || null,
        company: values.company || null,
        source: values.source || null,
        status: 'active',
      })
      toast.success('تم إنشاء العميل بنجاح')
      onClose()
    } catch {
      toast.error('حدث خطأ أثناء حفظ البيانات، حاول مرة أخرى')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-text">عميل جديد</h2>
          <button onClick={onClose} className="focus-ring rounded-lg p-1.5 text-muted hover:bg-[#F2F4F7]"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-5">
          <Field label="الاسم *" error={errors.first_name?.message}>
            <input {...register('first_name')} className="input" />
          </Field>
          <Field label="اسم العائلة">
            <input {...register('last_name')} className="input" />
          </Field>
          <Field label="الهاتف">
            <input {...register('phone')} className="input" dir="ltr" />
          </Field>
          <Field label="البريد الإلكتروني" error={errors.email?.message}>
            <input {...register('email')} className="input" dir="ltr" />
          </Field>
          <Field label="الشركة">
            <input {...register('company')} className="input" />
          </Field>
          <Field label="المصدر">
            <input {...register('source')} className="input" placeholder="واتساب، إحالة، موقع إلكتروني..." />
          </Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring mt-2 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isSubmitting ? 'جارِ الحفظ...' : 'حفظ العميل'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  )
}
