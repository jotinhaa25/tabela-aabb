import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, DEMO_USERS } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('viewer')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('aabb_user')
    const storedRole = localStorage.getItem('aabb_role')
    
    if (storedUser && storedRole) {
      setUser({ email: storedUser })
      setRole(storedRole)
    }
    setLoading(false)

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        const userRole = session.user.user_metadata?.role || 'viewer'
        setRole(userRole)
        localStorage.setItem('aabb_user', session.user.email)
        localStorage.setItem('aabb_role', userRole)
      } else {
        setUser(null)
        setRole('viewer')
        localStorage.removeItem('aabb_user')
        localStorage.removeItem('aabb_role')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    // First, try to authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      // Fallback to demo check if Supabase auth fails
      const isAdmin = email === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password
      const isViewer = email === DEMO_USERS.viewer.email && password === DEMO_USERS.viewer.password
      
      if (isAdmin) {
        const userData = { email, role: 'admin' }
        setUser(userData)
        setRole('admin')
        localStorage.setItem('aabb_user', email)
        localStorage.setItem('aabb_role', 'admin')
        return { success: true, role: 'admin' }
      } else if (isViewer) {
        const userData = { email, role: 'viewer' }
        setUser(userData)
        setRole('viewer')
        localStorage.setItem('aabb_user', email)
        localStorage.setItem('aabb_role', 'viewer')
        return { success: true, role: 'viewer' }
      }
      
      return { success: false, error: 'Credenciais inválidas' }
    }

    // Supabase auth succeeded
    if (authData.user) {
      setUser(authData.user)
      const userRole = authData.user.user_metadata?.role || 'viewer'
      setRole(userRole)
      localStorage.setItem('aabb_user', authData.user.email)
      localStorage.setItem('aabb_role', userRole)
      return { success: true, role: userRole }
    }
  }

  const logout = () => {
    setUser(null)
    setRole('viewer')
    localStorage.removeItem('aabb_user')
    localStorage.removeItem('aabb_role')
  }

  const isAdmin = role === 'admin'

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
