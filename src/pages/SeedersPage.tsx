import { Building2, Shield, UserCog, Users, KeyRound } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const seeders = [
  {
    role: 'Super Admin',
    icon: <Shield className="w-5 h-5 text-red-500" />,
    users: [
      { email: 'admin@luxcondo.co.ao', nome: 'Ricardo Silva', senha: '123456', desc: 'Acesso total a todo o sistema' },
    ],
  },
  {
    role: 'Administradores de Condomínio',
    icon: <UserCog className="w-5 h-5 text-blue-500" />,
    users: [
      { email: 'ana@luxcondo.co.ao', nome: 'Ana Administradora', senha: '123456', desc: 'Edifício Millennium' },
      { email: 'admin2@luxcondo.co.ao', nome: 'Bruno Administrador', senha: '123456', desc: 'Torres do Talatona' },
      { email: 'admin3@luxcondo.co.ao', nome: 'Hugo Administrador', senha: '123456', desc: 'Residencial Kilamba' },
      { email: 'admin4@luxcondo.co.ao', nome: 'Luísa Administradora', senha: '123456', desc: 'Edifício Mussulo' },
      { email: 'admin5@luxcondo.co.ao', nome: 'Pedro Administrador', senha: '123456', desc: 'Vila Verde Resort' },
    ],
  },
  {
    role: 'Porteiros',
    icon: <Building2 className="w-5 h-5 text-amber-500" />,
    users: [
      { email: 'porteiro1@luxcondo.co.ao', nome: 'Carlos Porteiro', senha: '123456', desc: 'Edifício Millennium' },
      { email: 'porteiro2@luxcondo.co.ao', nome: 'Daniel Porteiro', senha: '123456', desc: 'Torres do Talatona' },
      { email: 'porteiro3@luxcondo.co.ao', nome: 'Fernando Porteiro', senha: '123456', desc: 'Residencial Kilamba' },
      { email: 'porteiro4@luxcondo.co.ao', nome: 'Miguel Porteiro', senha: '123456', desc: 'Edifício Mussulo' },
      { email: 'porteiro5@luxcondo.co.ao', nome: 'Rui Porteiro', senha: '123456', desc: 'Vila Verde Resort' },
    ],
  },
  {
    role: 'Moradores / Condóminos',
    icon: <Users className="w-5 h-5 text-green-500" />,
    users: [
      { email: 'morador1@email.com', nome: 'João Silva', senha: '123456', desc: 'Edifício Millennium - Ap 1' },
      { email: 'morador2@email.com', nome: 'Maria Santos', senha: '123456', desc: 'Edifício Millennium - Ap 2' },
      { email: 'morador3@email.com', nome: 'Carlos Mendes', senha: '123456', desc: 'Edifício Millennium - Ap 3' },
      { email: 'morador4@email.com', nome: 'Paula Costa', senha: '123456', desc: 'Torres do Talatona - Ap 16' },
      { email: 'morador5@email.com', nome: 'António Lopes', senha: '123456', desc: 'Torres do Talatona - Ap 17' },
      { email: 'morador6@email.com', nome: 'Sofia Martins', senha: '123456', desc: 'Torres do Talatona - Ap 18' },
      { email: 'morador7@email.com', nome: 'Ricardo Oliveira', senha: '123456', desc: 'Residencial Kilamba - Ap 31' },
      { email: 'morador8@email.com', nome: 'Isabel Pereira', senha: '123456', desc: 'Residencial Kilamba - Ap 32' },
      { email: 'morador9@email.com', nome: 'Fernando Gomes', senha: '123456', desc: 'Edifício Mussulo - Ap 46' },
      { email: 'morador10@email.com', nome: 'Lúcia Rodrigues', senha: '123456', desc: 'Edifício Mussulo - Ap 47' },
      { email: 'morador11@email.com', nome: 'Miguel Almeida', senha: '123456', desc: 'Vila Verde Resort - Ap 61' },
      { email: 'morador12@email.com', nome: 'Catarina Sousa', senha: '123456', desc: 'Vila Verde Resort - Ap 62' },
    ],
  },
]

export function SeedersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl shadow-lg mb-3">
          <KeyRound className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Seeders - Contas de Teste</h1>
        <p className="text-sm text-gray-500 mt-1">
          Todas as contas usam a senha: <strong className="text-primary">123456</strong>
        </p>
        {!user && (
          <button
            onClick={() => navigate('/login')}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90"
          >
            Ir para o Login
          </button>
        )}
      </div>

      <div className="space-y-6">
        {seeders.map((group) => (
          <div key={group.role} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={`px-5 py-3 border-b border-gray-100 flex items-center gap-2`}>
              {group.icon}
              <h2 className="font-semibold text-gray-900">{group.role}</h2>
              <span className="ml-auto text-xs text-gray-400">{group.users.length} conta(s)</span>
            </div>
            <div className="divide-y divide-gray-50">
              {group.users.map((u) => (
                <div key={u.email} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{u.nome}</p>
                    <p className="text-xs text-gray-500">{u.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-primary">{u.email}</p>
                    <p className="text-xs text-gray-400">senha: {u.senha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
