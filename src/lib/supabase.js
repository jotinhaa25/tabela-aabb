import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const DEMO_USERS = {
  admin: {
    email: 'jotao18@gmail.com',
    password: 'admin18',
    role: 'admin'
  },
  viewer: {
    email: 'visitor@aabb.com',
    password: 'visitor123',
    role: 'viewer'
  }
}
