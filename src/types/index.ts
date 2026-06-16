export interface Condominio {
  id: string
  nome: string
  endereco: string
  cidade: string
  provincia: string
  numBlocos: number
  numUnidades: number
  sindico: string
  administrador: string
  status: 'activo' | 'manutencao' | 'pendente'
  imagem: string
  createdAt: string
}

export interface Bloco {
  id: string
  condominioId: string
  nome: string
  numAndares: number
  numUnidades: number
}

export interface Apartamento {
  id: string
  condominioId: string
  blocoId: string
  numero: string
  fraccao: string
  area: number
  moradorId?: string
}

export interface Morador {
  id: string
  nome: string
  telefone: string
  email: string
  bi: string
  tipo: 'proprietario' | 'inquilino'
  apartamentoId: string
  blocoId: string
  condominioId: string
  foto: string
  membroDesde: string
  veiculos: Veiculo[]
  animais: string[]
  dependentes: string[]
}

export interface Veiculo {
  matricula: string
  modelo: string
  cor: string
}

export interface Usuario {
  id: string
  nome: string
  email: string
  password: string
  perfil: 'super_admin' | 'admin' | 'sindico' | 'porteiro' | 'morador'
  condominioId?: string
  apartamentoId?: string
  foto: string
}

export interface Receita {
  id: string
  condominioId: string
  descricao: string
  categoria: string
  valor: number
  data: string
  status: 'recebido' | 'pendente' | 'atrasado'
  moradorId?: string
}

export interface Despesa {
  id: string
  condominioId: string
  descricao: string
  categoria: string
  valor: number
  data: string
  status: 'pago' | 'pendente' | 'atrasado'
  fornecedor?: string
}

export interface Pagamento {
  id: string
  moradorId: string
  condominioId: string
  valor: number
  data: string
  mes: number
  ano: number
  metodo: 'multicaixa' | 'transferencia' | 'dinheiro' | 'referencia'
  status: 'pago' | 'pendente' | 'atrasado'
  recibo?: string
}

export interface Cobranca {
  id: string
  condominioId: string
  moradorId: string
  valor: number
  mes: number
  ano: number
  dataVencimento: string
  dataEnvio?: string
  status: 'enviada' | 'paga' | 'atrasada' | 'cancelada'
  metodoEnvio: 'email' | 'whatsapp' | 'ambos'
}

export interface Ocorrencia {
  id: string
  condominioId: string
  titulo: string
  descricao: string
  tipo: 'ruido' | 'vazamento' | 'electrico' | 'seguranca' | 'outro'
  status: 'aberto' | 'em_andamento' | 'resolvido'
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente'
  moradorId?: string
  dataAbertura: string
  dataResolucao?: string
  fotos: string[]
  comentarios: Comentario[]
  localizacao: string
}

export interface Comentario {
  id: string
  autor: string
  texto: string
  data: string
}

export interface Manutencao {
  id: string
  condominioId: string
  titulo: string
  descricao: string
  tipo: 'preventiva' | 'correctiva'
  equipamento: string
  empresaResponsavel?: string
  custo: number
  dataAgendada: string
  dataRealizacao?: string
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada'
}

export interface Equipamento {
  id: string
  condominioId: string
  nome: string
  tipo: string
  ultimaManutencao: string
  proximaManutencao: string
  status: 'operacional' | 'manutencao' | 'avariado'
}

export interface Reserva {
  id: string
  condominioId: string
  areaId: string
  areaNome: string
  moradorId: string
  moradorNome: string
  data: string
  horaInicio: string
  horaFim: string
  status: 'pendente' | 'confirmada' | 'cancelada' | 'realizada'
  dataSolicitacao: string
}

export interface AreaComum {
  id: string
  condominioId: string
  nome: string
  descricao: string
  capacidade: number
  preco: number
  imagem: string
  horario: string
}

export interface Assembleia {
  id: string
  condominioId: string
  titulo: string
  descricao: string
  tipo: 'ordinaria' | 'extraordinaria'
  data: string
  horaInicio: string
  horaFim: string
  local: string
  formato: 'presencial' | 'online' | 'hibrido'
  status: 'agendada' | 'realizada' | 'cancelada'
  pauta: string[]
  votacoes: Votacao[]
  ata?: string
  presencas: number
  totalMoradores: number
}

export interface Votacao {
  id: string
  assembleiaId: string
  titulo: string
  descricao: string
  dataInicio: string
  dataFim: string
  status: 'ativa' | 'aprovada' | 'rejeitada'
  votosSim: number
  votosNao: number
  abstencoes: number
}

export interface Visitante {
  id: string
  condominioId: string
  nome: string
  documento: string
  telefone: string
  veiculo?: string
  unidadeDestino: string
  dataEntrada: string
  dataSaida?: string
  status: 'presente' | 'ausente'
  foto?: string
}

export interface Encomenda {
  id: string
  condominioId: string
  moradorNome: string
  unidade: string
  transportadora: string
  descricao: string
  dataRecebimento: string
  dataRetirada?: string
  status: 'pendente' | 'retirada'
  foto?: string
  codigo?: string
}

export interface Funcionario {
  id: string
  condominioId: string
  nome: string
  cargo: string
  telefone: string
  email: string
  bi: string
  salario: number
  dataAdmissao: string
  turno: string
  foto: string
}

export interface Prestador {
  id: string
  condominioId: string
  nome: string
  servico: string
  contacto: string
  email: string
  contrato: string
  valorMensal: number
  dataVencimento: string
  dataInicio: string
  status: 'activo' | 'inactivo'
}

export interface Documento {
  id: string
  condominioId: string
  nome: string
  categoria: string
  descricao: string
  dataUpload: string
  tamanho: string
  url: string
}

export interface Notificacao {
  id: string
  usuarioId: string
  titulo: string
  mensagem: string
  tipo: 'aviso' | 'cobranca' | 'ocorrencia' | 'assembleia' | 'reserva' | 'geral'
  lida: boolean
  data: string
}

export interface Aviso {
  id: string
  condominioId: string
  titulo: string
  mensagem: string
  tipo: 'agua' | 'energia' | 'reuniao' | 'evento' | 'obras' | 'geral'
  data: string
  dataExpiracao?: string
  autor: string
  canal: ('push' | 'whatsapp' | 'email')[]
}

export interface AppData {
  condominios: Condominio[]
  blocos: Bloco[]
  apartamentos: Apartamento[]
  moradores: Morador[]
  usuarios: Usuario[]
  receitas: Receita[]
  despesas: Despesa[]
  pagamentos: Pagamento[]
  cobrancas: Cobranca[]
  ocorrencias: Ocorrencia[]
  manutencoes: Manutencao[]
  equipamentos: Equipamento[]
  reservas: Reserva[]
  areasComuns: AreaComum[]
  assembleias: Assembleia[]
  visitantes: Visitante[]
  encomendas: Encomenda[]
  funcionarios: Funcionario[]
  prestadores: Prestador[]
  documentos: Documento[]
  notificacoes: Notificacao[]
  avisos: Aviso[]
}
