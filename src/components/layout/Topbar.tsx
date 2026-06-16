import { Search, Bell, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface TopbarProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function Topbar({ onMenuToggle, showMenuButton = false }: TopbarProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mobileSearchOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [mobileSearchOpen])

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-3 sm:px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
        {showMenuButton && onMenuToggle && (
          <button onClick={onMenuToggle} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg -ml-1">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Mobile search overlay */}
        {mobileSearchOpen && (
          <div className="absolute inset-x-0 top-0 z-40 bg-white border-b border-gray-100 flex items-center h-16 px-3 md:hidden">
            <div className="flex items-center gap-2 w-full">
              <button onClick={() => { setMobileSearchOpen(false); setSearchQuery('') }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Pesquisar..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Desktop search */}
        <div className="relative hidden md:block max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Pesquisar..."
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-3 shrink-0">
        {/* Mobile search toggle */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Search className="w-5 h-5 text-gray-500" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        {user && (
          <button
            onClick={() => navigate('/config')}
            className="flex items-center gap-2.5 pl-3 border-l border-gray-200"
            title={user.nome}
          >
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
