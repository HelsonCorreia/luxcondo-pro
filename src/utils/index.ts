export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value).replace('AOA', 'Kz').trim()
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-AO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateFull(date: string): string {
  return new Date(date).toLocaleDateString('pt-AO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString('pt-AO', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('pt-AO', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: string): string {
  return `${formatDateShort(date)} ${formatTime(date)}`
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  const intervals = [
    { label: 'ano', seconds: 31536000 },
    { label: 'mês', seconds: 2592000 },
    { label: 'semana', seconds: 604800 },
    { label: 'dia', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
  ]
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `há ${count} ${interval.label}${count > 1 ? 's' : ''}`
    }
  }
  return 'agora mesmo'
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    activo: 'bg-green-100 text-green-700',
    inactivo: 'bg-gray-100 text-gray-500',
    agendada: 'bg-blue-100 text-blue-700',
    realizada: 'bg-green-100 text-green-700',
    cancelada: 'bg-red-100 text-red-700',
    operacional: 'bg-green-100 text-green-700',
    avariado: 'bg-red-100 text-red-700',
    manutencao: 'bg-yellow-100 text-yellow-700',
    pendente: 'bg-yellow-100 text-yellow-700',
    pago: 'bg-green-100 text-green-700',
    recebido: 'bg-green-100 text-green-700',
    atrasado: 'bg-red-100 text-red-700',
    enviada: 'bg-blue-100 text-blue-700',
    paga: 'bg-green-100 text-green-700',
    p_a: 'bg-red-100 text-red-700',
    aberto: 'bg-yellow-100 text-yellow-700',
    em_andamento: 'bg-blue-100 text-blue-700',
    resolvido: 'bg-green-100 text-green-700',
    baixa: 'bg-gray-100 text-gray-600',
    media: 'bg-yellow-100 text-yellow-700',
    alta: 'bg-orange-100 text-orange-700',
    urgente: 'bg-red-100 text-red-700',
    confirmada: 'bg-green-100 text-green-700',
    proprietario: 'bg-blue-100 text-blue-700',
    inquilino: 'bg-gray-100 text-gray-600',
    activa: 'bg-green-100 text-green-700',
    aprovada: 'bg-green-100 text-green-700',
    rejeitada: 'bg-red-100 text-red-700',
    presente: 'bg-green-100 text-green-700',
    ausente: 'bg-gray-100 text-gray-500',
    retirada: 'bg-green-100 text-green-700',
    concluida: 'bg-green-100 text-green-700',
    preventiva: 'bg-blue-100 text-blue-700',
    correctiva: 'bg-orange-100 text-orange-700',
    ordinaria: 'bg-blue-100 text-blue-700',
    extraordinaria: 'bg-purple-100 text-purple-700',
    presencial: 'bg-blue-100 text-blue-700',
    online: 'bg-purple-100 text-purple-700',
    hibrido: 'bg-teal-100 text-teal-700',
  }
  return map[status] || 'bg-gray-100 text-gray-600'
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    activo: 'Activo',
    inactivo: 'Inactivo',
    agendada: 'Agendada',
    realizada: 'Realizada',
    cancelada: 'Cancelada',
    operacional: 'Operacional',
    avariado: 'Avariado',
    manutencao: 'Em Manutenção',
    pendente: 'Pendente',
    pago: 'Pago',
    recebido: 'Recebido',
    atrasado: 'Em Atraso',
    enviada: 'Enviada',
    paga: 'Paga',
    aberto: 'Aberto',
    em_andamento: 'Em Andamento',
    resolvido: 'Resolvido',
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
    urgente: 'Urgente',
    confirmada: 'Confirmada',
    proprietario: 'Proprietário',
    inquilino: 'Inquilino',
    activa: 'Activa',
    aprovada: 'Aprovada',
    rejeitada: 'Rejeitada',
    presente: 'Presente',
    ausente: 'Ausente',
    retirada: 'Retirada',
    concluida: 'Concluída',
    preventiva: 'Preventiva',
    correctiva: 'Correctiva',
    ordinaria: 'Ordinária',
    extraordinaria: 'Extraordinária',
    presencial: 'Presencial',
    online: 'Online',
    hibrido: 'Híbrido',
    ambos: 'Ambos',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    multicaixa: 'Multicaixa Express',
    transferencia: 'Transferência Bancária',
    dinheiro: 'Dinheiro',
    referencia: 'Referência',
  }
  return map[status] || status
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}
