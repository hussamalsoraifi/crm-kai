import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase/client'
import { useOrganization } from '../context/OrganizationContext'
import type { TablesInsert } from '../types/database.types'

export function useTasks() {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['tasks', currentOrganization?.id],
    enabled: !!currentOrganization,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, priority, status, due_date, contact_id, deal_id, assigned_to, contacts(full_name)')
        .eq('organization_id', currentOrganization!.id)
        .is('deleted_at', null)
        .order('due_date', { ascending: true })
      if (error) throw error
      return data
    },
  })
}

export function useCreateTask() {
  const { currentOrganization } = useOrganization()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<'tasks'>, 'organization_id'>) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ ...input, organization_id: currentOrganization!.id })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', currentOrganization?.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', currentOrganization?.id] })
    },
  })
}

export function useCompleteTask() {
  const { currentOrganization } = useOrganization()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', taskId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', currentOrganization?.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', currentOrganization?.id] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}
