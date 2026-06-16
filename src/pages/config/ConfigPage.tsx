import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { User, Shield, Bell, Palette, LogOut, Sun, Moon, Save } from 'lucide-react'

export function ConfigPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [tab, setTab] = useState<'perfil' | 'seguranca' | 'notificacoes' | 'tema'>('perfil')

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'tema', label: 'Tema', icon: Palette },
  ] as const

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie as definições da sua conta</p>
      </div>

      <div className="flex gap-1 bg-gray-50 p-1 rounded-xl overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        {tab === 'perfil' && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
              <img src={user?.foto} alt="" className="w-20 h-20 rounded-2xl object-cover" />
              <div>
                <h3 className="font-semibold text-gray-900">{user?.nome}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <Button size="sm" variant="outline" className="mt-2">Alterar Foto</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nome Completo" defaultValue={user?.nome} />
              <Input label="Email" defaultValue={user?.email} />
              <Input label="Telefone" defaultValue="+244 923 456 789" />
              <Input label="Cargo" defaultValue="Administrador" />
            </div>
            <Button icon={<Save className="w-4 h-4" />}>Salvar Alterações</Button>
          </div>
        )}

        {tab === 'seguranca' && (
          <div className="space-y-4">
            <Input label="Senha Actual" type="password" />
            <Input label="Nova Senha" type="password" />
            <Input label="Confirmar Nova Senha" type="password" />
            <Button icon={<Save className="w-4 h-4" />}>Alterar Senha</Button>
            <div className="pt-4 border-t border-gray-100">
              <Button variant="danger" onClick={logout} icon={<LogOut className="w-4 h-4" />}>Terminar Sessão</Button>
            </div>
          </div>
        )}

        {tab === 'notificacoes' && (
          <div className="space-y-4">
            {[
              { label: 'Cobranças e Pagamentos', desc: 'Notificações de vencimentos e recibos' },
              { label: 'Ocorrências', desc: 'Actualizações sobre reclamações abertas' },
              { label: 'Assembleias', desc: 'Convocações e resultados de votações' },
              { label: 'Reservas', desc: 'Confirmações e cancelamentos de reservas' },
              { label: 'Avisos', desc: 'Comunicados importantes do condomínio' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            ))}
          </div>
        )}

        {tab === 'tema' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Escolha o modo de visualização do sistema.</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`p-6 rounded-xl border-2 text-center transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <Sun className={`w-8 h-8 mx-auto mb-2 ${theme === 'light' ? 'text-primary' : 'text-gray-400'}`} />
                <p className={`font-semibold ${theme === 'light' ? 'text-primary' : 'text-gray-600'}`}>Claro</p>
              </button>
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`p-6 rounded-xl border-2 text-center transition-all ${theme === 'dark' ? 'border-primary bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <Moon className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`} />
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>Escuro</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
