export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          actor_id: string | null
          contact_id: string | null
          created_at: string
          deal_id: string | null
          description: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          organization_id: string
          task_id: string | null
          title: string | null
          type: string
        }
        Insert: {
          actor_id?: string | null
          contact_id?: string | null
          created_at?: string
          deal_id?: string | null
          description?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          organization_id: string
          task_id?: string | null
          title?: string | null
          type: string
        }
        Update: {
          actor_id?: string | null
          contact_id?: string | null
          created_at?: string
          deal_id?: string | null
          description?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          organization_id?: string
          task_id?: string | null
          title?: string | null
          type?: string
        }
        Relationships: []
      }
      contact_tags: {
        Row: { contact_id: string; id: string; tag_id: string }
        Insert: { contact_id: string; id?: string; tag_id: string }
        Update: { contact_id?: string; id?: string; tag_id?: string }
        Relationships: []
      }
      contacts: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          organization_id: string
          owner_id: string | null
          phone: string | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          organization_id: string
          owner_id?: string | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          participant_id: string
          participant_type: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          participant_id: string
          participant_type: string
        }
        Update: Partial<Database["public"]["Tables"]["conversation_participants"]["Insert"]>
        Relationships: []
      }
      conversations: {
        Row: {
          channel: string
          contact_id: string | null
          created_at: string
          external_id: string | null
          id: string
          last_message_at: string | null
          organization_id: string
          status: string
          updated_at: string
        }
        Insert: {
          channel?: string
          contact_id?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          last_message_at?: string | null
          organization_id: string
          status?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>
        Relationships: []
      }
      custom_field_values: {
        Row: {
          created_at: string
          custom_field_id: string
          entity_id: string
          id: string
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          custom_field_id: string
          entity_id: string
          id?: string
          updated_at?: string
          value?: Json | null
        }
        Update: Partial<Database["public"]["Tables"]["custom_field_values"]["Insert"]>
        Relationships: []
      }
      custom_fields: {
        Row: {
          created_at: string
          entity_type: string
          field_type: string
          id: string
          is_required: boolean
          key: string
          name: string
          options: Json | null
          organization_id: string
          position: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_type: string
          field_type: string
          id?: string
          is_required?: boolean
          key: string
          name: string
          options?: Json | null
          organization_id: string
          position?: number
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["custom_fields"]["Insert"]>
        Relationships: []
      }
      deals: {
        Row: {
          contact_id: string | null
          created_at: string
          currency: string | null
          deleted_at: string | null
          description: string | null
          expected_close_date: string | null
          id: string
          organization_id: string
          owner_id: string | null
          pipeline_id: string | null
          probability: number | null
          stage_id: string | null
          title: string
          updated_at: string
          value: number | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          currency?: string | null
          deleted_at?: string | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          organization_id: string
          owner_id?: string | null
          pipeline_id?: string | null
          probability?: number | null
          stage_id?: string | null
          title: string
          updated_at?: string
          value?: number | null
        }
        Update: Partial<Database["public"]["Tables"]["deals"]["Insert"]>
        Relationships: []
      }
      files: {
        Row: {
          contact_id: string | null
          created_at: string
          deal_id: string | null
          id: string
          mime_type: string | null
          name: string
          organization_id: string
          size: number | null
          storage_path: string
          task_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          mime_type?: string | null
          name: string
          organization_id: string
          size?: number | null
          storage_path: string
          task_id?: string | null
          uploaded_by?: string | null
        }
        Update: Partial<Database["public"]["Tables"]["files"]["Insert"]>
        Relationships: []
      }
      leads: {
        Row: {
          contact_id: string | null
          created_at: string
          deleted_at: string | null
          estimated_value: number | null
          id: string
          notes: string | null
          organization_id: string
          owner_id: string | null
          source: string | null
          status: string
          title: string | null
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          deleted_at?: string | null
          estimated_value?: number | null
          id?: string
          notes?: string | null
          organization_id: string
          owner_id?: string | null
          source?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string
          external_id: string | null
          id: string
          message_type: string
          metadata: Json | null
          organization_id: string
          sender_id: string | null
          sender_type: string
          status: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string
          external_id?: string | null
          id?: string
          message_type?: string
          metadata?: Json | null
          organization_id: string
          sender_id?: string | null
          sender_type: string
          status?: string
        }
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>
        Relationships: []
      }
      notes: {
        Row: {
          contact_id: string | null
          content: string
          created_at: string
          created_by: string | null
          deal_id: string | null
          id: string
          lead_id: string | null
          organization_id: string
          task_id: string | null
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          id?: string
          lead_id?: string | null
          organization_id: string
          task_id?: string | null
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          metadata: Json | null
          organization_id: string
          read_at: string | null
          title: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          organization_id: string
          read_at?: string | null
          title?: string | null
          type?: string | null
          user_id: string
        }
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: string
          status?: string
          user_id: string
        }
        Update: Partial<Database["public"]["Tables"]["organization_members"]["Insert"]>
        Relationships: []
      }
      organizations: {
        Row: {
          accent_color: string
          created_at: string
          created_by: string | null
          currency: string
          id: string
          logo_url: string | null
          name: string
          primary_color: string
          slug: string
          timezone: string
          updated_at: string
        }
        Insert: {
          accent_color?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string
          slug: string
          timezone?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>
        Relationships: []
      }
      pipeline_stages: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          pipeline_id: string
          position: number
          probability: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          pipeline_id: string
          position?: number
          probability?: number
        }
        Update: Partial<Database["public"]["Tables"]["pipeline_stages"]["Insert"]>
        Relationships: []
      }
      pipelines: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_default: boolean
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["pipelines"]["Insert"]>
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          organization_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          organization_id: string
        }
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          deal_id: string | null
          deleted_at: string | null
          description: string | null
          due_date: string | null
          id: string
          organization_id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          deleted_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>
        Relationships: []
      }
    }
    Views: {
      contact_last_activity: {
        Row: {
          contact_id: string | null
          last_activity_at: string | null
          organization_id: string | null
        }
        Relationships: []
      }
      dashboard_stats: {
        Row: {
          activities_today: number | null
          my_pending_tasks: number | null
          new_leads: number | null
          open_deals: number | null
          organization_id: string | null
          overdue_tasks: number | null
          total_contacts: number | null
          total_deal_value: number | null
        }
        Relationships: []
      }
      deal_pipeline_summary: {
        Row: {
          deal_count: number | null
          pipeline_id: string | null
          stage_id: string | null
          total_value: number | null
        }
        Relationships: []
      }
      my_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          deleted_at: string | null
          description: string | null
          due_date: string | null
          id: string | null
          organization_id: string | null
          priority: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_organization_role: {
        Args: { org_id: string; required_roles: string[] }
        Returns: boolean
        Relationships: []
      }
      is_organization_member: { Args: { org_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database["public"]

export type Tables<
  T extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[T] extends { Row: infer R } ? R : never

export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T] extends { Insert: infer I } ? I : never

export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T] extends { Update: infer U } ? U : never
