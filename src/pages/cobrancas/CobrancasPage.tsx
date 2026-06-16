import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, Send, History } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils'

export function CobrancasPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cobranças</h1>
          <p className="text-sm text-gray-500 mt-1">Gere as quotas de condomínio e cobranças automáticas</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" icon={<History className="w-4 h-4" />}>Histórico</Button>
          <Button icon={<Plus className="w-4 h-4" />}>Gerar Quotas</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Cobranças Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-medium">Morador</th>
                <th className="px-6 py-3.5 font-medium">Valor</th>
                <th className="px-6 py-3.5 font-medium">Mês</th>
                <th className="px-6 py-3.5 font-medium">Vencimento</th>
                <th className="px-6 py-3.5 font-medium">Método</th>
                <th className="px-6 py-3.5 font-medium">Estado</th>
                <th className="px-6 py-3.5 font-medium text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.cobrancas.map(c => {
                const mor = data.moradores.find(m => m.id === c.moradorId)
                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{mor?.nome || 'Desconhecido'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(c.valor)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{c.mes}/{c.ano}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{c.dataVencimento}</td>
                    <td className="px-6 py-4"><Badge status={c.metodoEnvio} /></td>
                    <td className="px-6 py-4"><Badge status={c.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="ghost" icon={<Send className="w-3 h-3" />}>Reenviar</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <p className="text-sm text-gray-500 mb-1">Quotas Emitidas</p>
          <p className="text-2xl font-bold text-gray-900">{data.cobrancas.length}</p>
          <p className="text-xs text-gray-400 mt-1">Este mês</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <p className="text-sm text-gray-500 mb-1">Taxa de Pagamento</p>
          <p className="text-2xl font-bold text-green-600">78%</p>
          <p className="text-xs text-gray-400 mt-1">Últimos 30 dias</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <p className="text-sm text-gray-500 mb-1">Valor Médio</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.cobrancas.reduce((a, b) => a + b.valor, 0) / (data.cobrancas.length || 1))}</p>
          <p className="text-xs text-gray-400 mt-1">Por quota</p>
        </div>
      </div>
    </div>
  )
}
