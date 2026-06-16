import { Search, Bell, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface TopbarProps {
  title?: string
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function Topbar({ title, onMenuToggle, showMenuButton = false }: TopbarProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 flex-1">
        {showMenuButton && onMenuToggle && (
          <button onClick={onMenuToggle} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div className="relative hidden md:block max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Pesquisar..."
            onFocus={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        {user && (
          <button onClick={() => navigate('/config')} className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user.nome}</p>
              <p className="text-[11px] text-gray-400 capitalize">{user.perfil.replace('_', ' ')}</p>
            </div>
            <img src={user.foto} alt={user.nome} className="w-9 h-9 rounded-full object-cover border-2 border-gray-100" />
          </button>
        )}
      </div>
    </header>
  )
}
