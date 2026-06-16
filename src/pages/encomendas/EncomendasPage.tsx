import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Package, Plus } from 'lucide-react'
import { formatDate } from '../../utils'

export function EncomendasPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Encomendas</h1>
          <p className="text-sm text-gray-500 mt-1">Registo e controlo de encomendas recebidas</p>
        </div>
        <Button icon={<Package className="w-4 h-4" />}>Registar Encomenda</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">{data.encomendas.filter(e => e.status === 'pendente').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Retiradas</p>
          <p className="text-2xl font-bold text-green-600">{data.encomendas.filter(e => e.status === 'retirada').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{data.encomendas.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-medium">Morador</th>
                <th className="px-6 py-3.5 font-medium">Unidade</th>
                <th className="px-6 py-3.5 font-medium">Transportadora</th>
                <th className="px-6 py-3.5 font-medium">Descrição</th>
                <th className="px-6 py-3.5 font-medium">Recebida</th>
                <th className="px-6 py-3.5 font-medium">Estado</th>
                <th className="px-6 py-3.5 font-medium text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.encomendas.map(e => (
                <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{e.moradorNome}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{e.unidade}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{e.transportadora}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{e.descricao}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(e.dataRecebimento)}</td>
                  <td className="px-6 py-4"><Badge status={e.status} /></td>
                  <td className="px-6 py-4 text-right">
                    {e.status === 'pendente' && (
                      <Button size="sm" variant="secondary">Confirmar Retirada</Button>
                    )}
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
