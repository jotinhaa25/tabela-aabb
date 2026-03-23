import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Login from './pages/Login'
import Matches from './pages/Matches'
import Standings from './pages/Standings'
import Rules from './pages/Rules'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Matches />} />
              <Route path="/classificacao" element={<Standings />} />
              <Route path="/regulamento" element={<Rules />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-slate-500 text-sm">
                AABB - Associação Atlética Banco do Brasil • Campeonato 2026
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
