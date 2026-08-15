import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase/client'
import { useOrganization } from '../context/OrganizationContext'
import type { TablesInsert } from '../types/database.types'

export function useContacts() {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['contacts', currentOrganization?.id],
    enabled: !!currentOrganization,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('id, full_name, first_name, last_name, phone, email, company, status, owner_id, source, created_at')
        .eq('organization_id', currentOrganization!.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useContact(contactId: string | null) {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['contact', contactId],
    enabled: !!contactId && !!currentOrganization,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', contactId!)
        .single()
      if (error) throw error
      return data
    },
  })
}

export function useCreateContact() {
  const { currentOrganization } = useOrganization()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<'contacts'>, 'organization_id'>) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert({ ...input, organization_id: currentOrganization!.id, full_name: input.full_name ?? `${input.first_name ?? ''} ${input.last_name ?? ''}`.trim() })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', currentOrganization?.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', currentOrganization?.id] })
    },
  })
}
