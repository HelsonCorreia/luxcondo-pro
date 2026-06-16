import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/ui/Button'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@luxcondo.co.ao')
  const [password, setPassword] = useState('123456')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        navigate('/')
      } else {
        setError('Email ou senha incorrectos. Tente novamente.')
      }
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">LuxCondo Pro</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão de Condomínios em Angola</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Email Profissional</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="admin@luxcondo.co.ao"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <Link to="/recuperar-senha" className="text-xs text-primary hover:underline font-medium">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : null}
          {loading ? 'A autenticar...' : 'Entrar no Painel'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Não tem uma conta?{' '}
        <Link to="/registar" className="text-primary font-semibold hover:underline">
          Solicite acesso
        </Link>
      </p>

      <div className="text-center space-x-4">
        <Link to="#" className="text-xs text-gray-400 hover:text-gray-600">Política de Privacidade</Link>
        <span className="text-gray-300">•</span>
        <Link to="#" className="text-xs text-gray-400 hover:text-gray-600">Termos de Serviço</Link>
      </div>

      <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700 text-center space-y-1">
        <strong>Credenciais de teste (senha: 123456):</strong>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-left mt-1">
          <span className="font-medium">Super Admin:</span><span>admin@luxcondo.co.ao</span>
          <span className="font-medium">Admin Cond 1:</span><span>ana@luxcondo.co.ao</span>
          <span className="font-medium">Admin Cond 2:</span><span>admin2@luxcondo.co.ao</span>
          <span className="font-medium">Admin Cond 3:</span><span>admin3@luxcondo.co.ao</span>
          <span className="font-medium">Admin Cond 4:</span><span>admin4@luxcondo.co.ao</span>
          <span className="font-medium">Admin Cond 5:</span><span>admin5@luxcondo.co.ao</span>
          <span className="font-medium">Porteiro:</span><span>porteiro1@luxcondo.co.ao</span>
          <span className="font-medium">Morador:</span><span>morador1@email.com</span>
        </div>
        <a href="/seeders" target="_blank" className="block mt-1 text-blue-500 hover:underline">Ver todos os seeders</a>
      </div>
    </div>
  )
}
