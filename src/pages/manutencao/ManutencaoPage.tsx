import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, Calendar } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils'

export function ManutencaoPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manutenção</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie as manutenções preventivas e correctivas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>Calendário</Button>
          <Button icon={<Plus className="w-4 h-4" />}>Nova Manutenção</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Agendadas</p>
          <p className="text-2xl font-bold text-blue-600">{data.manutencoes.filter(m => m.status === 'agendada').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Em Andamento</p>
          <p className="text-2xl font-bold text-yellow-600">{data.manutencoes.filter(m => m.status === 'em_andamento').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Concluídas</p>
          <p className="text-2xl font-bold text-green-600">{data.manutencoes.filter(m => m.status === 'concluida').length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center">
          <p className="text-sm text-gray-500">Custo Total</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.manutencoes.reduce((a, b) => a + b.custo, 0))}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Manutenções</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-medium">Título</th>
                <th className="px-6 py-3.5 font-medium">Tipo</th>
                <th className="px-6 py-3.5 font-medium">Equipamento</th>
                <th className="px-6 py-3.5 font-medium">Empresa</th>
                <th className="px-6 py-3.5 font-medium">Custo</th>
                <th className="px-6 py-3.5 font-medium">Data</th>
                <th className="px-6 py-3.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.manutencoes.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{m.titulo}</td>
                  <td className="px-6 py-4"><Badge status={m.tipo} /></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.equipamento}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.empresaResponsavel || '-'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(m.custo)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(m.dataAgendada)}</td>
                  <td className="px-6 py-4"><Badge status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Equipamentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.equipamentos.map(eq => (
            <div key={eq.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-900">{eq.nome}</p>
                <Badge status={eq.status} />
              </div>
              <p className="text-xs text-gray-500">{eq.tipo}</p>
              <p className="text-xs text-gray-400 mt-2">Última manutenção: {formatDate(eq.ultimaManutencao)}</p>
              <p className="text-xs text-gray-400">Próxima: {formatDate(eq.proximaManutencao)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
