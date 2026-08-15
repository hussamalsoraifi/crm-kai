import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase/client'
import { useAuth } from './AuthContext'
import type { Tables } from '../types/database.types'

type Organization = Tables<'organizations'>
type MemberRole = Tables<'organization_members'>['role']

interface OrganizationContextValue {
  organizations: Organization[]
  currentOrganization: Organization | null
  currentRole: MemberRole | null
  setCurrentOrganizationId: (id: string) => void
  isLoading: boolean
}

const OrganizationContext = createContext<OrganizationContextValue | undefined>(undefined)

const STORAGE_KEY = 'one-crm:current-org'

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  )

  const { data, isLoading } = useQuery({
    queryKey: ['my-organizations', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organization_members')
        .select('role, organizations(*)')
        .eq('user_id', user!.id)
        .eq('status', 'active')
      if (error) throw error
      return data.map((row) => ({
        organization: row.organizations as unknown as Organization,
        role: row.role,
      }))
    },
  })

  const organizations = (data ?? []).map((d) => d.organization).filter(Boolean)

  useEffect(() => {
    if (!currentOrgId && organizations.length > 0) {
      setCurrentOrgId(organizations[0].id)
    }
  }, [organizations, currentOrgId])

  const current = data?.find((d) => d.organization?.id === currentOrgId)

  useEffect(() => {
    const org = current?.organization
    const root = document.documentElement
    if (org?.primary_color) root.style.setProperty('--color-primary', org.primary_color)
    if (org?.accent_color) root.style.setProperty('--color-accent', org.accent_color)
  }, [current])

  function setCurrentOrganizationId(id: string) {
    setCurrentOrgId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        currentOrganization: current?.organization ?? null,
        currentRole: (current?.role as MemberRole) ?? null,
        setCurrentOrganizationId,
        isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const ctx = useContext(OrganizationContext)
  if (!ctx) throw new Error('useOrganization must be used within OrganizationProvider')
  return ctx
}
