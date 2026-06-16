import { useData } from '../../contexts/DataContext'
import { useAuth } from '../../contexts/AuthContext'
import { StatsCard } from '../../components/ui/StatsCard'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Wallet, CalendarDays, AlertTriangle, FileText, Bell, CreditCard, Download, ArrowRight } from 'lucide-react'
import { formatCurrency, formatDate, timeAgo } from '../../utils'
import { useNavigate } from 'react-router-dom'

export function PortalPage() {
  const { data } = useData()
  const { user } = useAuth()
  const navigate = useNavigate()

  const morador = data.moradores.find(m => m.id === user?.apartamentoId) || data.moradores[0]
  const meusPagamentos = data.pagamentos.filter(p => p.moradorId === morador?.id)
  const minhasReservas = data.reservas.filter(r => r.moradorId === morador?.id)
  const minhasOcorrencias = data.ocorrencias.filter(o => o.moradorId === morador?.id)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-white/5 rounded-full" />
        <h1 className="text-xl font-bold">Olá, {morador?.nome || 'Morador'}</h1>
        <p className="text-sm opacity-90 mt-1">Bem-vindo ao seu portal. Aqui gere a sua rotina no condomínio.</p>
        <div className="mt-4 flex items-center gap-3 bg-white/10 rounded-xl p-3 w-fit">
          <span className="text-xs uppercase tracking-widest opacity-80">Previsão</span>
          <span className="text-2xl font-bold">28°C</span>
          <span className="text-sm opacity-80">Luanda, Angola</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => navigate('/reservas')} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-gray-900">Reservar Área</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
        </button>
        <button onClick={() => navigate('/ocorrencias')} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <span className="font-semibold text-gray-900">Abrir Ocorrência</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
        </button>
        <button className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-semibold text-gray-900">Pagar Quota</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Minhas Quotas</h3>
              <Button size="sm" variant="ghost">Ver Histórico</Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-red-400">
                <p className="text-xs text-red-500 font-bold uppercase mb-1">Mês Actual - Vence a 05/12</p>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">Quota Condominial - Novembro/2023</h4>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(meusPagamentos[0]?.valor || 45000)}</span>
                </div>
                <Button size="sm" variant="primary" className="mt-3" icon={<Download className="w-3 h-3" />}>Descarregar Recibo</Button>
              </div>
              <div className="p-4 bg-gray-50/50 rounded-xl border-l-4 border-gray-200">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Lançado - Vence a 05/12</p>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">Quota Condominial - Dezembro/2023</h4>
                  <span className="text-lg font-bold text-gray-400">{formatCurrency(meusPagamentos[0]?.valor || 45000)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Comunicados</h3>
            <div className="space-y-3">
              {data.avisos.slice(0, 3).map(aviso => (
                <div key={aviso.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{aviso.titulo}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{aviso.mensagem}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{timeAgo(aviso.data)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Minhas Reservas</h3>
            {minhasReservas.length > 0 ? (
              minhasReservas.slice(0, 2).map(r => (
                <div key={r.id} className="mb-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">{r.areaNome}</h4>
                    <Badge status={r.status} />
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(r.data)} • {r.horaInicio}-{r.horaFim}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">Nenhuma reserva activa</p>
            )}
            <button className="w-full mt-3 p-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary hover:text-primary transition-all">
              + Nova Reserva
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Consumo de Água</h3>
            <div className="flex items-end gap-1 h-20 mb-2">
              {[40, 60, 45, 70, 85].map((h, i) => (
                <div key={i} className="w-full bg-gray-200 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
              <div className="w-full bg-primary rounded-t-sm" style={{ height: '90%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span className="text-primary font-bold">Nov</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
