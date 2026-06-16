import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Plus, Filter, Search } from 'lucide-react'
import { formatDate, timeAgo } from '../../utils'

export function OcorrenciasPage() {
  const { data } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = data.ocorrencias.filter(o =>
    o.titulo.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || o.status === filter)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ocorrências</h1>
          <p className="text-sm text-gray-500 mt-1">Acompanhe e resolva as ocorrências dos moradores</p>
        </div>
        <Button onClick={() => setModalOpen(true)} icon={<Plus className="w-4 h-4" />}>Nova Ocorrência</Button>
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Pesquisar ocorrências..." />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm">
          <option value="">Todos os Estados</option>
          <option value="aberto">Aberto</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="resolvido">Resolvido</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(o => (
          <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{o.titulo}</h3>
              <Badge status={o.prioridade} />
            </div>
            <Badge status={o.status} className="mb-3" />
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{o.descricao}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{timeAgo(o.dataAbertura)}</span>
              <span>{o.localizacao}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova Ocorrência"
        footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button><Button>Registrar</Button></>}>
        <div className="space-y-4">
          <Input label="Título" placeholder="Ex: Fuga de Água" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm">
              <option>Ruído</option>
              <option>Vazamento</option>
              <option>Eléctrico</option>
              <option>Segurança</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Prioridade</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm">
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
              <option>Urgente</option>
            </select>
          </div>
          <Input label="Localização" placeholder="Torre A - Piso 3" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]" placeholder="Descreva a ocorrência em detalhe..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}
