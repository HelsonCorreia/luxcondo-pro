import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, UserPlus } from 'lucide-react'
import { formatDate } from '../../utils'

export function VisitantesPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitantes</h1>
          <p className="text-sm text-gray-500 mt-1">Registo de entradas e saídas de visitantes</p>
        </div>
        <Button icon={<UserPlus className="w-4 h-4" />}>Registar Visitante</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-medium">Visitante</th>
                <th className="px-6 py-3.5 font-medium">Documento</th>
                <th className="px-6 py-3.5 font-medium">Destino</th>
                <th className="px-6 py-3.5 font-medium">Entrada</th>
                <th className="px-6 py-3.5 font-medium">Saída</th>
                <th className="px-6 py-3.5 font-medium">Estado</th>
                <th className="px-6 py-3.5 font-medium text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.visitantes.map(v => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{v.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{v.documento}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{v.unidadeDestino}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(v.dataEntrada)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{v.dataSaida ? formatDate(v.dataSaida) : '-'}</td>
                  <td className="px-6 py-4"><Badge status={v.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="ghost">Registar Saída</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
