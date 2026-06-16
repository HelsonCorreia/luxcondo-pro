import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, CalendarDays, CheckCircle, XCircle } from 'lucide-react'
import { formatDate } from '../../utils'

export function AssembleiasPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assembleias</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie reuniões, votações e actas do condomínio</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Nova Assembleia</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {data.assembleias.map(asm => (
            <div key={asm.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-4">
                  <div className="text-center bg-gray-50 rounded-xl p-3 min-w-[70px]">
                    <p className="text-xs text-gray-400 font-bold uppercase">{new Date(asm.data).toLocaleString('pt-AO', { month: 'short' })}</p>
                    <p className="text-xl font-bold text-gray-900">{new Date(asm.data).getDate()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{asm.titulo}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{asm.horaInicio} - {asm.horaFim} • {asm.local}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{asm.descricao}</p>
                  </div>
                </div>
                <Badge status={asm.status} />
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span><Badge status={asm.formato} /></span>
                  <span><Badge status={asm.tipo} /></span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Ver Pauta</Button>
                  <Button size="sm" icon={<CheckCircle className="w-3 h-3" />}>Votar</Button>
                </div>
              </div>
              {asm.votacoes.length > 0 && (
                <div className="mt-4 space-y-3">
                  {asm.votacoes.map(v => (
                    <div key={v.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-900">{v.titulo}</p>
                        <Badge status={v.status} />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                        <div className="bg-primary h-full" style={{ width: `${(v.votosSim / (v.votosSim + v.votosNao + v.abstencoes)) * 100}%` }} />
                        <div className="bg-red-400 h-full" style={{ width: `${(v.votosNao / (v.votosSim + v.votosNao + v.abstencoes)) * 100}%` }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1 text-gray-500">
                        <span>{v.votosSim} Sim</span>
                        <span>{v.votosNao} Não</span>
                        <span>{v.abstencoes} Abstenções</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-primary rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-80 uppercase tracking-wider">Participação</p>
            <p className="text-4xl font-bold mt-1">84%</p>
            <p className="text-xs opacity-70 mt-2">Média de presença nas assembleias</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Histórico de Actas</h3>
            <div className="space-y-3">
              {data.assembleias.map(asm => (
                <div key={asm.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{asm.titulo}</p>
                    <p className="text-xs text-gray-400">{formatDate(asm.data)}</p>
                  </div>
                  <button className="text-xs text-primary font-semibold hover:underline">Ver Ata</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
