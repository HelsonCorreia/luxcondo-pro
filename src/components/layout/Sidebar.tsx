import { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Users, Wallet, Receipt,
  AlertTriangle, Wrench, Vote, CalendarDays, UserRound,
  Package, Briefcase, Handshake, FileText, MessageSquare,
  Settings, ChevronRight, LogOut, Sun, Moon,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

interface NavItem {
  icon: ReactNode
  label: string
  path: string
  badge?: string
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  { icon: <Building2 className="w-5 h-5" />, label: 'Condomínios', path: '/condominios' },
  { icon: <Users className="w-5 h-5" />, label: 'Moradores', path: '/moradores' },
  { icon: <Wallet className="w-5 h-5" />, label: 'Financeiro', path: '/financeiro' },
  { icon: <Receipt className="w-5 h-5" />, label: 'Cobranças', path: '/cobrancas' },
  { icon: <AlertTriangle className="w-5 h-5" />, label: 'Ocorrências', path: '/ocorrencias' },
  { icon: <Wrench className="w-5 h-5" />, label: 'Manutenção', path: '/manutencao' },
  { icon: <Vote className="w-5 h-5" />, label: 'Assembleias', path: '/assembleias' },
  { icon: <CalendarDays className="w-5 h-5" />, label: 'Reservas', path: '/reservas' },
  { icon: <UserRound className="w-5 h-5" />, label: 'Visitantes', path: '/visitantes' },
  { icon: <Package className="w-5 h-5" />, label: 'Encomendas', path: '/encomendas' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Funcionários', path: '/funcionarios' },
  { icon: <Handshake className="w-5 h-5" />, label: 'Prestadores', path: '/prestadores' },
  { icon: <FileText className="w-5 h-5" />, label: 'Documentos', path: '/documentos' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Comunicação', path: '/comunicacao' },
  { icon: <Settings className="w-5 h-5" />, label: 'Configurações', path: '/config' },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 bg-white border-r border-gray-100 fixed left-0 top-0 z-40 shadow-sm">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-primary">LuxCondo Pro</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Angola</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path))
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span className={active ? 'text-primary' : 'text-gray-400'}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 bg-primary text-white text-[10px] rounded-full font-bold">{item.badge}</span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="px-3 py-3 border-t border-gray-100 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2.5">
            <img src={user.foto} alt={user.nome} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.nome}</p>
              <p className="text-[11px] text-gray-400 capitalize">{user.perfil.replace('_', ' ')}</p>
            </div>
            <button onClick={logout} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
