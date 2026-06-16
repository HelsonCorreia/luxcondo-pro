import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, Building2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils'

export function PrestadoresPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prestadores de Serviços</h1>
          <p className="text-sm text-gray-500 mt-1">Empresas e prestadores com contrato activo</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Novo Prestador</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.prestadores.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{p.nome}</h3>
                  <p className="text-sm text-gray-500">{p.servico}</p>
                </div>
              </div>
              <Badge status={p.status} />
            </div>
            <div className="space-y-1.5 text-sm text-gray-500">
              <p><span className="text-gray-400">Contacto:</span> {p.contacto}</p>
              <p><span className="text-gray-400">Email:</span> {p.email}</p>
              <p><span className="text-gray-400">Contrato:</span> {p.contrato}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Valor Mensal</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(p.valorMensal)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Vencimento</p>
                <p className="text-sm text-gray-500">{formatDate(p.dataVencimento)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
