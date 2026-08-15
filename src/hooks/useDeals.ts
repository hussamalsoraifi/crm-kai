import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase/client'
import { useOrganization } from '../context/OrganizationContext'
import type { TablesInsert } from '../types/database.types'

export function usePipeline() {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['pipeline', currentOrganization?.id],
    enabled: !!currentOrganization,
    queryFn: async () => {
      const { data: pipeline, error: pErr } = await supabase
        .from('pipelines')
        .select('id, name')
        .eq('organization_id', currentOrganization!.id)
        .eq('is_default', true)
        .single()
      if (pErr) throw pErr

      const { data: stages, error: sErr } = await supabase
        .from('pipeline_stages')
        .select('id, name, color, position, probability')
        .eq('pipeline_id', pipeline.id)
        .order('position', { ascending: true })
      if (sErr) throw sErr

      return { pipeline, stages }
    },
  })
}

export function useDeals() {
  const { currentOrganization } = useOrganization()
  return useQuery({
    queryKey: ['deals', currentOrganization?.id],
    enabled: !!currentOrganization,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deals')
        .select('id, title, value, currency, stage_id, pipeline_id, owner_id, contact_id, updated_at, contacts(full_name)')
        .eq('organization_id', currentOrganization!.id)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useMoveDeal() {
  const { currentOrganization } = useOrganization()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ dealId, stageId }: { dealId: string; stageId: string }) => {
      const { error } = await supabase
        .from('deals')
        .update({ stage_id: stageId })
        .eq('id', dealId)
      if (error) throw error
    },
    onMutate: async ({ dealId, stageId }) => {
      await queryClient.cancelQueries({ queryKey: ['deals', currentOrganization?.id] })
      const previous = queryClient.getQueryData<any[]>(['deals', currentOrganization?.id])
      queryClient.setQueryData<any[]>(['deals', currentOrganization?.id], (old) =>
        old?.map((d) => (d.id === dealId ? { ...d, stage_id: stageId } : d))
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['deals', currentOrganization?.id], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', currentOrganization?.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', currentOrganization?.id] })
    },
  })
}

export function useCreateDeal() {
  const { currentOrganization } = useOrganization()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<'deals'>, 'organization_id'>) => {
      const { data, error } = await supabase
        .from('deals')
        .insert({ ...input, organization_id: currentOrganization!.id })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', currentOrganization?.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats', currentOrganization?.id] })
    },
  })
}
