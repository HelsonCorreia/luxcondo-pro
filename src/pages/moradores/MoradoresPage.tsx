import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Search, Plus, Phone, Mail, MoreVertical } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'

export function MoradoresPage() {
  const { data } = useData()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = data.moradores.filter(m =>
    m.nome.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Moradores</h1>
          <p className="text-sm text-gray-500 mt-1">{data.moradores.length} residentes registados</p>
        </div>
        <Button onClick={() => setModalOpen(true)} icon={<Plus className="w-4 h-4" />}>Novo Morador</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Pesquisar moradores..."
          />
        </div>
        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm">
          <option value="">Todos</option>
          <option value="proprietario">Proprietários</option>
          <option value="inquilino">Inquilinos</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-medium">Morador</th>
                <th className="px-6 py-3.5 font-medium">Unidade</th>
                <th className="px-6 py-3.5 font-medium">Contacto</th>
                <th className="px-6 py-3.5 font-medium">Tipo</th>
                <th className="px-6 py-3.5 font-medium text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={m.foto} alt={m.nome} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{m.nome}</p>
                        <p className="text-xs text-gray-400">Membro desde {new Date(m.membroDesde).getFullYear()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.fraccao || `Apto ${data.apartamentos.find(a => a.id === m.apartamentoId)?.fraccao || '-'}`}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <a href={`tel:${m.telefone}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                      </a>
                      <a href={`mailto:${m.email}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge status={m.tipo} /></td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Novo Morador" size="lg"
        footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button><Button>Salvar</Button></>}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2"><Input label="Nome Completo" placeholder="Nome do morador" /></div>
          <Input label="Email" type="email" placeholder="email@exemplo.com" />
          <Input label="Telefone" placeholder="+244 900 000 000" />
          <Input label="BI" placeholder="Bilhete de Identidade" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm">
              <option>Proprietário</option>
              <option>Inquilino</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
