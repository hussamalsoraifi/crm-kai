import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database.types'

// هذه القيم عامة (Publishable) وآمنة للاستخدام في الواجهة الأمامية.
// الحماية الفعلية تتم عبر Row Level Security في قاعدة البيانات.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://fqogeyjfedqloyfinqbk.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_Locjqd6hRCDgve6g7QmomA_I9qDRgKk'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
