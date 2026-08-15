import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase/client'
import { useOrganization } from '../context/OrganizationContext'

export function useContactActivities(contactId: string | null) {
  return useQuery({
    queryKey: ['activities', 'contact', contactId],
    enabled: !!contactId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('id, type, title, description, created_at')
        .eq('contact_id', contactId!)
        .order('created_at', { ascending: false })
        .limit(30)
      if (error) throw error
      return data
    },
  })
}

export function useOrgActivities() {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['activities', 'org', currentOrganization?.id],
    enabled: !!currentOrganization,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('id, type, title, description, created_at')
        .eq('organization_id', currentOrganization!.id)
        .order('created_at', { ascending: false })
        .limit(15)
      if (error) throw error
      return data
    },
  })
}

export function useDashboardStats() {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['dashboard-stats', currentOrganization?.id],
    enabled: !!currentOrganization,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('organization_id', currentOrganization!.id)
        .single()
      if (error) throw error
      return data
    },
  })
}

export function useCreateNote() {
  const { currentOrganization } = useOrganization()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: { content: string; contact_id?: string; deal_id?: string; created_by: string }) => {
      const { error } = await supabase
        .from('notes')
        .insert({ ...input, organization_id: currentOrganization!.id })
      if (error) throw error
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['activities', 'contact', vars.contact_id] })
      queryClient.invalidateQueries({ queryKey: ['activities', 'org', currentOrganization?.id] })
    },
  })
}
