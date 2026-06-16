import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, Calendar } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils'

export function ReservasPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservas de Áreas Comuns</h1>
          <p className="text-sm text-gray-500 mt-1">Visualize, aprove e gerencie o uso das áreas comuns</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>Calendário</Button>
          <Button icon={<Plus className="w-4 h-4" />}>Nova Reserva</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.areasComuns.filter((a, i) => i < 4).map(area => (
          <div key={area.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-all group">
            <div className="relative h-36 overflow-hidden">
              <img src={area.imagem} alt={area.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <h3 className="text-white font-semibold">{area.nome}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2">{area.descricao}</p>
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-500">Capacidade: {area.capacidade} pessoas</span>
                <span className="font-semibold text-primary">{area.preco === 0 ? 'Grátis' : formatCurrency(area.preco)}</span>
              </div>
              <Button size="sm" className="w-full">Reservar</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Reservas Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-medium">Área</th>
                <th className="px-6 py-3.5 font-medium">Morador</th>
                <th className="px-6 py-3.5 font-medium">Data</th>
                <th className="px-6 py-3.5 font-medium">Horário</th>
                <th className="px-6 py-3.5 font-medium">Estado</th>
                <th className="px-6 py-3.5 font-medium text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.reservas.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.areaNome}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{r.moradorNome}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(r.data)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{r.horaInicio} - {r.horaFim}</td>
                  <td className="px-6 py-4"><Badge status={r.status} /></td>
                  <td className="px-6 py-4 text-right">
                    {r.status === 'pendente' && (
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" variant="ghost"><Badge status="confirmada" /></Button>
                        <Button size="sm" variant="ghost"><Badge status="cancelada" /></Button>
                      </div>
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
