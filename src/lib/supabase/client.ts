import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database.types'

// هذه القيم عامة (Publishable) وآمنة للاستخدام في الواجهة الأمامية.
// الحماية الفعلية تتم عبر Row Level Security في قاعدة البيانات.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://njgkdmzxnqtnubnadasp.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_OoEPy1dcKgFJWvUE_AmppQ_kEfQnmQJ'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
