import { useData } from '../../contexts/DataContext'
import { Button } from '../../components/ui/Button'
import { Upload, FileText, Download, Search } from 'lucide-react'
import { formatDate } from '../../utils'
import { useState } from 'react'

export function DocumentosPage() {
  const { data } = useData()
  const [search, setSearch] = useState('')

  const filtered = data.documentos.filter(d =>
    d.nome.toLowerCase().includes(search.toLowerCase()) ||
    d.categoria.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
          <p className="text-sm text-gray-500 mt-1">Biblioteca de documentos do condomínio</p>
        </div>
        <Button icon={<Upload className="w-4 h-4" />}>Upload Documento</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Pesquisar documentos..." />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Nenhum documento</h3>
          <p className="text-sm text-gray-500 mb-4">Comece por fazer upload dos documentos do condomínio.</p>
          <Button icon={<Upload className="w-4 h-4" />}>Upload Documento</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-card-hover transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doc.nome}</h3>
                  <p className="text-xs text-gray-400">{doc.categoria}</p>
                  <p className="text-xs text-gray-400 mt-1">{doc.tamanho} • {formatDate(doc.dataUpload)}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400">{doc.descricao}</span>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
