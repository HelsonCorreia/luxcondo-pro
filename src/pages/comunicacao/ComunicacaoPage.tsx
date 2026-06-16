import { useData } from '../../contexts/DataContext'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Plus, Send, Bell, MessageSquare, Megaphone } from 'lucide-react'
import { formatDate, timeAgo } from '../../utils'

export function ComunicacaoPage() {
  const { data } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comunicação</h1>
          <p className="text-sm text-gray-500 mt-1">Avisos, notificações e comunicação com moradores</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Novo Aviso</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Avisos</h3>
            <Button size="sm" variant="ghost"><Megaphone className="w-4 h-4" /> Novo</Button>
          </div>
          <div className="space-y-3">
            {data.avisos.map(aviso => (
              <div key={aviso.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge status={aviso.tipo === 'agua' || aviso.tipo === 'energia' ? 'urgente' : aviso.tipo} />
                    <h4 className="text-sm font-semibold text-gray-900">{aviso.titulo}</h4>
                  </div>
                  <span className="text-xs text-gray-400">{timeAgo(aviso.data)}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{aviso.mensagem}</p>
                <div className="flex gap-2 mt-2">
                  {aviso.canal.map(c => (
                    <span key={c} className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-500 border border-gray-200">
                      {c === 'push' ? 'Push' : c === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Notificações</h3>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{data.notificacoes.filter(n => !n.lida).length} não lidas</span>
          </div>
          <div className="space-y-2">
            {data.notificacoes.map(notif => (
              <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${notif.lida ? '' : 'bg-blue-50/50'}`}>
                <div className={`p-2 rounded-lg ${notif.tipo === 'cobranca' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-primary'}`}>
                  {notif.tipo === 'cobranca' ? <Send className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${notif.lida ? 'text-gray-500' : 'font-semibold text-gray-900'}`}>{notif.titulo}</p>
                  <p className="text-xs text-gray-400">{notif.mensagem}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(notif.data)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
