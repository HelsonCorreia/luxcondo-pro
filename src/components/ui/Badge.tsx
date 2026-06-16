interface BadgeProps {
  status: string
  label?: string
  className?: string
}

export function Badge({ status, label, className = '' }: BadgeProps) {
  const colors: Record<string, string> = {
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
    aberto: 'bg-yellow-100 text-yellow-700',
    em_andamento: 'bg-blue-100 text-blue-700',
    resolvido: 'bg-green-100 text-green-700',
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
    baixa: 'bg-gray-100 text-gray-600',
    media: 'bg-yellow-100 text-yellow-700',
    alta: 'bg-orange-100 text-orange-700',
    'Em Atraso': 'bg-red-100 text-red-700',
  }

  const labels: Record<string, string> = {
    activo: 'Activo', inactivo: 'Inactivo', agendada: 'Agendada',
    realizada: 'Realizada', cancelada: 'Cancelada', pendente: 'Pendente',
    pago: 'Pago', atrasado: 'Em Atraso', recebido: 'Recebido',
    aberto: 'Aberto', em_andamento: 'Em Andamento', resolvido: 'Resolvido',
    urgente: 'Urgente', confirmada: 'Confirmada',
    proprietario: 'Proprietário', inquilino: 'Inquilino',
    activa: 'Activa', aprovada: 'Aprovada', rejeitada: 'Rejeitada',
    presente: 'Presente', ausente: 'Ausente',
    retirada: 'Retirada', concluida: 'Concluída',
    preventiva: 'Preventiva', correctiva: 'Correctiva',
    ordinaria: 'Ordinária', extraordinaria: 'Extraordinária',
    presencial: 'Presencial', online: 'Online', hibrido: 'Híbrido',
    enviada: 'Enviada', paga: 'Paga',
    operacional: 'Operacional', avariado: 'Avariado', baixa: 'Baixa',
    media: 'Média', alta: 'Alta',
  }

  const colorClass = colors[status] || 'bg-gray-100 text-gray-600'
  const displayLabel = label || labels[status] || status

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass} ${className}`}>
      {displayLabel}
    </span>
  )
}
