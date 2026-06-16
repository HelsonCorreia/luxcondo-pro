import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Recuperar Senha</h1>
        <p className="text-sm text-gray-500 mt-1">Receberá um link no seu email</p>
      </div>

      {!sent ? (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="admin@luxcondo.co.ao"
                required
              />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">Enviar Link</Button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <p className="text-sm text-gray-600">Link de recuperação enviado para o seu email.</p>
        </div>
      )}

      <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Login
      </Link>
    </div>
  )
}
