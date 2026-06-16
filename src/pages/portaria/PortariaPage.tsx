import { useData } from '../../contexts/DataContext'
import { StatsCard } from '../../components/ui/StatsCard'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { UserRound, Car, Package, Clock, UserPlus } from 'lucide-react'
import { formatDate, timeAgo } from '../../utils'

export function PortariaPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel da Portaria</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão de acessos, visitantes e encomendas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard icon={UserRound} iconBg="bg-blue-50" iconColor="text-primary" label="Visitantes Hoje" value={String(data.visitantes.filter(v => v.status === 'presente').length)} />
        <StatsCard icon={Car} iconBg="bg-purple-50" iconColor="text-purple-600" label="Veículos" value="12" subtitle="No recinto" />
        <StatsCard icon={Package} iconBg="bg-yellow-50" iconColor="text-yellow-600" label="Encomendas" value={String(data.encomendas.filter(e => e.status === 'pendente').length)} subtitle="Por retirar" />
        <StatsCard icon={Clock} iconBg="bg-green-50" iconColor="text-green-600" label="Entradas Hoje" value="24" subtitle="Últimas 24h" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Visitantes no Local</h3>
            <Button size="sm" icon={<UserPlus className="w-4 h-4" />}>Registar</Button>
          </div>
          <div className="space-y-2">
            {data.visitantes.filter(v => v.status === 'presente').slice(0, 5).map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-900">{v.nome}</p>
                  <p className="text-xs text-gray-500">Destino: {v.unidadeDestino}</p>
                </div>
                <Button size="sm" variant="ghost">Registar Saída</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Últimas Encomendas</h3>
            <Button size="sm" variant="outline" icon={<Package className="w-4 h-4" />}>Registar</Button>
          </div>
          <div className="space-y-2">
            {data.encomendas.filter(e => e.status === 'pendente').slice(0, 5).map(e => (
              <div key={e.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-900">{e.moradorNome}</p>
                  <p className="text-xs text-gray-500">{e.transportadora} • {e.descricao}</p>
                </div>
                <Button size="sm" variant="secondary">Retirada</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
