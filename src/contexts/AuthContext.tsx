import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import type { AppData } from '../types'
import { generateMockData } from '../data/mockData'

interface AuthUser {
  id: string
  nome: string
  email: string
  perfil: string
  condominioId?: string
  apartamentoId?: string
  foto: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('luxcondo_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxcondo_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('luxcondo_user')
    }
  }, [user])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    const data = getMockData()
    const found = data.usuarios.find(u => u.email === email && u.password === password)
    if (found) {
      setUser({
        id: found.id,
        nome: found.nome,
        email: found.email,
        perfil: found.perfil,
        condominioId: found.condominioId,
        apartamentoId: found.apartamentoId,
        foto: found.foto,
      })
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('luxcondo_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

function getMockData(): AppData {
  if (typeof window === 'undefined') return generateMockData()
  const stored = localStorage.getItem('luxcondo_data')
  if (stored) return JSON.parse(stored)
  const data = generateMockData()
  localStorage.setItem('luxcondo_data', JSON.stringify(data))
  return data
}
