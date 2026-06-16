import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { StatsCard } from '../../components/ui/StatsCard'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Download, Plus, Filter } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom'

export function FinanceiroPage() {
  const { data } = useData()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'geral' | 'receitas' | 'despesas' | 'inadimplentes'>('geral')

  const totalReceitas = data.receitas.reduce((a, b) => a + b.valor, 0)
  const totalDespesas = data.despesas.reduce((a, b) => a + b.valor, 0)
  const saldo = totalReceitas - totalDespesas
  const inadimplentes = data.pagamentos.filter(p => p.status === 'atrasado')

  const receitasChart = data.receitas.map(r => ({
    mes: new Date(r.data).toLocaleString('pt-AO', { month: 'short' }),
    valor: r.valor,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-sm text-gray-500 mt-1">Visão geral das finanças do condomínio</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" icon={<Download className="w-4 h-4" />}>Exportar PDF</Button>
          <Button icon={<Plus className="w-4 h-4" />}>Novo Lançamento</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard icon={Wallet} iconBg="bg-green-50" iconColor="text-green-600" label="Saldo Total" value={formatCurrency(saldo)} subtitle="Consolidado" trend="+8.2%" trendUp />
        <StatsCard icon={TrendingDown} iconBg="bg-red-50" iconColor="text-red-500" label="Total em Dívida" value={formatCurrency(inadimplentes.reduce((a, b) => a + b.valor, 0))} subtitle={`${inadimplentes.length} moradores`} trend="+2.1%" />
        <StatsCard icon={TrendingUp} iconBg="bg-blue-50" iconColor="text-primary" label="Receita Prevista" value={formatCurrency(totalReceitas)} subtitle="Estimativa anual" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <div className="flex gap-4 border-b border-gray-100 mb-6">
          {(['geral', 'receitas', 'despesas', 'inadimplentes'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm font-medium transition-colors relative ${tab === t ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-gray-400 hover:text-gray-600'}`}>
              {t === 'geral' ? 'Visão Geral' : t === 'receitas' ? 'Receitas' : t === 'despesas' ? 'Despesas' : 'Inadimplentes'}
            </button>
          ))}
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={receitasChart}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Area type="monotone" dataKey="valor" stroke="#1E3A8A" fill="url(#colorVal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="pb-3 font-medium">Descrição</th>
                <th className="pb-3 font-medium">Categoria</th>
                <th className="pb-3 font-medium">Data</th>
                <th className="pb-3 font-medium">Valor</th>
                <th className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(tab === 'receitas' || tab === 'geral' ? data.receitas : data.despesas).slice(0, 5).map(item => {
                const isReceita = 'categoria' in item && !('fornecedor' in item)
                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 text-sm font-medium text-gray-900">{item.descricao}</td>
                    <td className="py-3.5 text-sm text-gray-500">{item.categoria}</td>
                    <td className="py-3.5 text-sm text-gray-500">{formatDate(item.data)}</td>
                    <td className={`py-3.5 text-sm font-semibold ${isReceita ? 'text-green-600' : 'text-red-500'}`}>
                      {isReceita ? '+' : '-'}{formatCurrency(item.valor)}
                    </td>
                    <td className="py-3.5"><Badge status={item.status} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {tab === 'inadimplentes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inadimplentes.map(p => {
            const mor = data.moradores.find(m => m.id === p.moradorId)
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-red-100 p-4 shadow-card">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-gray-900">{mor?.nome || 'Desconhecido'}</p>
                  <span className="text-sm font-bold text-red-500">{formatCurrency(p.valor)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">Vencido em {formatDate(p.data)}</p>
        <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" className="flex-1">Email</Button>
                  <Button size="sm" variant="secondary" className="flex-1">WhatsApp</Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
