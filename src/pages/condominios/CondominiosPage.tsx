import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { Plus, Search, MapPin, MoreHorizontal } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useState } from 'react'
import { formatCurrency } from '../../utils'

export function CondominiosPage() {
  const { data } = useData()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = data.condominios.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.cidade.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Condomínios</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie suas propriedades em Angola.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Novo Condomínio</Button>
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Pesquisar condomínios..."
          />
        </div>
        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Todos os Status</option>
          <option value="activo">Activo</option>
          <option value="manutencao">Em Manutenção</option>
          <option value="pendente">Pendente</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cond => (
          <div key={cond.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-all group">
            <div className="relative h-44 overflow-hidden">
              <img src={cond.imagem} alt={cond.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3"><Badge status={cond.status} /></div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">{cond.nome}</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="w-4 h-4" /> {cond.cidade}, {cond.provincia}
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 rounded-xl p-2">
                  <p className="text-xs text-gray-400">Blocos</p>
                  <p className="text-lg font-bold text-gray-900">{cond.numBlocos}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2">
                  <p className="text-xs text-gray-400">Unidades</p>
                  <p className="text-lg font-bold text-gray-900">{cond.numUnidades}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2">
                  <p className="text-xs text-gray-400">Ocupação</p>
                  <p className="text-lg font-bold text-gray-900">
                    {Math.round((data.moradores.filter(m => m.condominioId === cond.id).length / cond.numUnidades) * 100)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Síndico</p>
                  <p className="text-sm font-medium text-gray-900">{cond.sindico}</p>
                </div>
                <button onClick={() => navigate(`/condominios/${cond.id}`)} className="text-sm text-primary font-semibold hover:underline">Detalhes</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
