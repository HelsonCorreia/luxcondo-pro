import { useData } from '../../contexts/DataContext'
import { useAuth } from '../../contexts/AuthContext'
import { StatsCard } from '../../components/ui/StatsCard'
import { Badge } from '../../components/ui/Badge'
import { Building2, Users, Wallet, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatDate, timeAgo, getStatusLabel } from '../../utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function DashboardPage() {
  const { data } = useData()
  const { user } = useAuth()
  const navigate = useNavigate()

  const totalReceitas = data.receitas.filter(r => r.status === 'recebido').reduce((a, b) => a + b.valor, 0)
  const totalDespesas = data.despesas.filter(d => d.status === 'pago').reduce((a, b) => a + b.valor, 0)
  const ocorrenciasAbertas = data.ocorrencias.filter(o => o.status !== 'resolvido').length
  const inadimplentes = data.pagamentos.filter(p => p.status === 'atrasado').length

  const receitasPorMes = data.receitas.filter(r => r.status === 'recebido')
  const receitasChart = receitasPorMes.map(r => ({
    mes: new Date(r.data).toLocaleString('pt-AO', { month: 'short' }),
    receitas: r.valor,
  }))

  const despesasPorMes = data.despesas.filter(d => d.status === 'pago')
  despesasPorMes.forEach((d, i) => {
    if (receitasChart[i]) receitasChart[i].despesas = d.valor
  })

  const manutencoesProximas = data.manutencoes.filter(m => m.status === 'agendada').slice(0, 4)
  const pagamentosRecentes = data.pagamentos.filter(p => p.status === 'pago' || p.status === 'atrasado').slice(0, 5)
  const ocorrenciasRecentes = data.ocorrencias.sort((a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime()).slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta{user?.nome ? `, ${user.nome}` : ''}</h1>
        <p className="text-sm text-gray-500 mt-1">Veja o que está a acontecer nos seus condomínios hoje.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Building2} iconBg="bg-blue-50" iconColor="text-primary" label="Condomínios" value={String(data.condominios.length)} subtitle="Total registado" />
        <StatsCard icon={Users} iconBg="bg-purple-50" iconColor="text-purple-600" label="Moradores" value={String(data.moradores.length)} subtitle="Em todas as unidades" />
        <StatsCard icon={Wallet} iconBg="bg-green-50" iconColor="text-green-600" label="Receita do Mês" value={formatCurrency(totalReceitas / 12)} subtitle="Média mensal" trend="+12.5%" trendUp />
        <StatsCard icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-500" label="Ocorrências Abertas" value={String(ocorrenciasAbertas)} subtitle="Pendentes de resolução" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Receitas vs Despesas</h3>
              <p className="text-sm text-gray-500">Desempenho financeiro anual</p>
            </div>
            <div className="flex gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary" /> Receitas</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400" /> Despesas</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={receitasChart}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="receitas" stroke="#1E3A8A" fill="url(#colorRev)" strokeWidth={2} />
                <Area type="monotone" dataKey="despesas" stroke="#f97316" fill="none" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
            <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Manutenção</h3>
            <button onClick={() => navigate('/manutencao')} className="text-xs text-primary font-semibold hover:underline">Ver Tudo</button>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-64 custom-scrollbar pr-1">
            {manutencoesProximas.map(m => (
              <div key={m.id} className="p-3 bg-gray-50 rounded-xl border-l-4 border-primary">
                <p className="text-sm font-semibold text-gray-900">{m.titulo}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.equipamento} • {formatDate(m.dataAgendada)}</p>
              </div>
            ))}
            {manutencoesProximas.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Nenhuma manutenção agendada</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Pagamentos Recentes</h3>
            <button onClick={() => navigate('/cobrancas')} className="text-xs text-primary font-semibold hover:underline">Ver Todas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium">Morador</th>
                  <th className="px-6 py-3 font-medium">Valor</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pagamentosRecentes.map(p => {
                  const mor = data.moradores.find(m => m.id === p.moradorId)
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{mor?.nome || 'Desconhecido'}</td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-gray-900">{formatCurrency(p.valor)}</td>
                      <td className="px-6 py-3.5 text-sm text-gray-500">{formatDate(p.data)}</td>
                      <td className="px-6 py-3.5"><Badge status={p.status} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Ocorrências Recentes</h3>
            <button onClick={() => navigate('/ocorrencias')} className="text-xs text-primary font-semibold hover:underline">Ver Todas</button>
          </div>
          <div className="p-4 space-y-3">
            {ocorrenciasRecentes.map(o => {
              const mor = data.moradores.find(m => m.id === o.moradorId)
              return (
                <div key={o.id} className="p-4 bg-gray-50 rounded-xl hover:border-primary/30 transition-all cursor-pointer border border-transparent">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">{o.titulo}</h4>
                    <Badge status={o.status} />
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{o.descricao}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                    <span>{timeAgo(o.dataAbertura)}</span>
                    <span>{o.localizacao}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
