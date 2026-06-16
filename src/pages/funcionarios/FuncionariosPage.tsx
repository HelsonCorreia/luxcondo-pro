import { useData } from '../../contexts/DataContext'
import { Button } from '../../components/ui/Button'
import { Plus, Phone, Mail, Calendar } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils'

export function FuncionariosPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Funcionários</h1>
          <p className="text-sm text-gray-500 mt-1">{data.funcionarios.length} funcionários registados</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Novo Funcionário</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.funcionarios.map(f => (
          <div key={f.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover transition-all">
            <div className="flex items-center gap-4 mb-4">
              <img src={f.foto} alt={f.nome} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h3 className="font-semibold text-gray-900">{f.nome}</h3>
                <p className="text-sm text-gray-500">{f.cargo}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {f.telefone}</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {f.email}</p>
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /> Desde {formatDate(f.dataAdmissao)}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(f.salario)}</span>
              <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{f.turno}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
