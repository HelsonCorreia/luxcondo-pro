import { Building2, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function RegisterPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl shadow-lg mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Solicitar Acesso</h1>
      <p className="text-sm text-gray-500">
        Para solicitar acesso ao LuxCondo Pro, entre em contacto com a administração.
      </p>
      <div className="p-4 bg-gray-50 rounded-xl text-left space-y-2">
        <p className="text-sm font-medium text-gray-700">Contactos:</p>
        <p className="text-sm text-gray-500">📧 comercial@luxcondo.co.ao</p>
        <p className="text-sm text-gray-500">📞 +244 923 456 789</p>
      </div>
      <Link to="/login">
        <Button variant="outline" size="lg" className="w-full">Voltar ao Login</Button>
      </Link>
    </div>
  )
}
