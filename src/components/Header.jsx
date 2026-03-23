import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, role, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Jogos' },
    { path: '/classificacao', label: 'Classificação' },
    { path: '/regulamento', label: 'Regulamento' },
  ]

  return (
    <header className="bg-primary/80 backdrop-blur-md border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bebas text-3xl text-primary shadow-lg group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-white leading-none">TABELA AABB</h1>
              <p className="text-[10px] text-accent uppercase tracking-[0.2em] mt-1 font-bold">Campeonato 2026</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-accent text-primary shadow-lg shadow-accent/20'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right border-r border-white/10 pr-4">
                  <p className="text-sm font-bold text-white leading-none">{user.email}</p>
                  <p className={`text-[10px] uppercase font-bold mt-1 ${role === 'admin' ? 'text-accent' : 'text-text-secondary'}`}>
                    {role === 'admin' ? 'Administrador' : 'Visitante'}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-text-secondary hover:text-error transition-colors"
                  title="Sair"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-bold text-sm uppercase tracking-wider transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 py-4 border-t border-white/10' : 'max-h-0'}`}>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                  isActive(item.path)
                    ? 'bg-accent text-primary'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
