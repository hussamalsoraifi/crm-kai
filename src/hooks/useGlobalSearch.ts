import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase/client'
import { useOrganization } from '../context/OrganizationContext'

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(t)
  }, [value, delayMs])
  return debounced
}

export function useGlobalSearch(rawQuery: string) {
  const { currentOrganization } = useOrganization()
  const query = useDebouncedValue(rawQuery.trim(), 300)

  return useQuery({
    queryKey: ['global-search', currentOrganization?.id, query],
    enabled: !!currentOrganization && query.length >= 2,
    queryFn: async () => {
      const orgId = currentOrganization!.id
      const [contacts, deals, tasks] = await Promise.all([
        supabase.from('contacts').select('id, full_name').eq('organization_id', orgId).ilike('full_name', `%${query}%`).limit(5),
        supabase.from('deals').select('id, title').eq('organization_id', orgId).ilike('title', `%${query}%`).limit(5),
        supabase.from('tasks').select('id, title').eq('organization_id', orgId).ilike('title', `%${query}%`).limit(5),
      ])
      return {
        contacts: contacts.data ?? [],
        deals: deals.data ?? [],
        tasks: tasks.data ?? [],
      }
    },
  })
}
