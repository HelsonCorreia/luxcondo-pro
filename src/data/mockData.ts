import type { AppData } from '../types'

const condominioImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
]

const moradorFotos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
]

const nomes = [
  'Ana Santos', 'Carlos Mendes', 'Maria da Silva', 'João Ferreira',
  'Paula Costa', 'António Lopes', 'Sofia Martins', 'Ricardo Oliveira',
  'Isabel Pereira', 'Fernando Gomes', 'Lúcia Rodrigues', 'Miguel Almeida',
  'Catarina Sousa', 'Pedro Carvalho', 'Teresa Pinto', 'Bruno Ribeiro',
  'Daniela Teixeira', 'Hugo Moreira', 'Rita Correia', 'Nuno Barbosa',
  'Camila Rocha', 'André Matos', 'Bianca Neves', 'Gonçalo Baptista',
  'Lara Campos', 'Fábio Cunha', 'Marta Simões', 'Diago Vieira',
  'Sandra Torres', 'Rui Marques', 'Vera Castro', 'Luís Cardoso',
  'Telma Figueiredo', 'Eduardo Azevedo', 'Diana Guerreiro', 'Rafael Machado',
  'Helena Barros', 'Tiago Leite', 'Inês Freitas', 'Vasco Araújo',
  'Cláudia Valente', 'Jorge Andrade', 'Sara Pinheiro', 'Artur Nunes',
  'Filipa Antunes', 'Daniel Vaz', 'Patrícia Melo', 'Simão Carneiro',
]

const provincias = ['Luanda', 'Benguela', 'Huíla', 'Huambo', 'Lubango', 'Cabinda', 'Malanje', 'Namibe']
const cidades: Record<string, string[]> = {
  Luanda: ['Luanda', 'Talatona', 'Belas', 'Viana', 'Cacuaco', 'Kilamba Kiaxi'],
  Benguela: ['Benguela', 'Lobito', 'Baía Farta'],
  Huíla: ['Lubango', 'Matala', 'Quilengues'],
  Huambo: ['Huambo', 'Caála', 'Catchiungo'],
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1)
  const end = new Date(endYear, 0, 1)
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export function generateMockData(): AppData {
  const provincia = randomItem(provincias)

  const condominios = [
    { nome: 'Edifício Millennium', endereco: 'Av. 4 de Fevereiro, 120', cidade: 'Luanda', provincia: 'Luanda' },
    { nome: 'Torres do Talatona', endereco: 'Via Expressa, Km 12', cidade: 'Talatona', provincia: 'Luanda' },
    { nome: 'Residencial Kilamba', endereco: 'Rua das Flores, Bloco C', cidade: 'Luanda', provincia: 'Luanda' },
    { nome: 'Edifício Mussulo', endereco: 'Av. Marginal, 45', cidade: 'Luanda', provincia: 'Luanda' },
    { nome: 'Vila Verde Resort', endereco: 'Estrada da Samba, Km 8', cidade: 'Luanda', provincia: 'Luanda' },
  ]

  const condData = condominios.map((c, i) => ({
    id: `cond_${i + 1}`,
    nome: c.nome,
    endereco: c.endereco,
    cidade: c.cidade,
    provincia: c.provincia,
    numBlocos: randomNum(1, 4),
    numUnidades: randomNum(20, 80),
    sindico: randomItem(nomes),
    administrador: 'Ricardo Silva',
    status: i === 1 ? ('manutencao' as const) : i === 3 ? ('pendente' as const) : ('activo' as const),
    imagem: condominioImages[i % condominioImages.length],
    createdAt: randomDate(2018, 2022),
  }))

  const blocos: AppData['blocos'] = []
  const apartamentos: AppData['apartamentos'] = []
  const moradores: AppData['moradores'] = []
  const areasComuns: AppData['areasComuns'] = []

  let apId = 1
  let moradorId = 1

  for (const cond of condData) {
    for (let b = 1; b <= cond.numBlocos; b++) {
      const blocoId = `bloco_${cond.id}_${b}`
      blocos.push({
        id: blocoId,
        condominioId: cond.id,
        nome: `Bloco ${String.fromCharCode(64 + b)}`,
        numAndares: randomNum(4, 12),
        numUnidades: randomNum(8, 20),
      })

      const unidadesPorBloco = randomNum(8, 15)
      for (let u = 1; u <= unidadesPorBloco; u++) {
        const fraccao = `${String.fromCharCode(64 + b)}${String(u).padStart(2, '0')}`
        apartamentos.push({
          id: `ap_${apId}`,
          condominioId: cond.id,
          blocoId,
          numero: `${Math.ceil(u / 4)}${String.fromCharCode(64 + (u % 4 || 4))}`,
          fraccao: fraccao,
          area: randomNum(60, 200),
        })
        apId++
      }
    }

    const totalAps = apartamentos.filter(a => a.condominioId === cond.id).length
    const numMoradores = Math.ceil(totalAps * 0.7)

    const apList = apartamentos.filter(a => a.condominioId === cond.id)
    for (let m = 0; m < numMoradores && m < apList.length; m++) {
      const ap = apList[m]
      const nome = nomes[moradorId % nomes.length]
      moradores.push({
        id: `mor_${moradorId}`,
        nome,
        telefone: `+244 9${randomNum(11, 99)} ${randomNum(100, 999)} ${randomNum(100, 999)}`,
        email: `${nome.toLowerCase().replace(/\s+/g, '.')}@email.com`,
        bi: `${String(randomNum(100000, 999999))}${String.fromCharCode(65 + randomNum(0, 25))}${String(randomNum(100, 999))}`,
        tipo: Math.random() > 0.3 ? 'proprietario' : 'inquilino',
        apartamentoId: ap.id,
        blocoId: ap.blocoId,
        condominioId: cond.id,
        foto: moradorFotos[moradorId % moradorFotos.length],
        membroDesde: randomDate(2019, 2023),
        veiculos: Math.random() > 0.4 ? [{ matricula: `${String.fromCharCode(65 + randomNum(0, 25))}${String(randomNum(10, 99))}${String.fromCharCode(65 + randomNum(0, 25))}${String.fromCharCode(65 + randomNum(0, 25))}`, modelo: randomItem(['Toyota Corolla', 'Honda Civic', 'Hyundai i30', 'Mercedes C180', 'BMW 320i']), cor: randomItem(['Preto', 'Branco', 'Cinzento', 'Azul']) }] : [],
        animais: Math.random() > 0.7 ? [randomItem(['Cão', 'Gato', 'Pássaro'])] : [],
        dependentes: Math.random() > 0.5 ? [randomItem(['Filho(a)', 'Pai', 'Mãe', 'Avó'])] : [],
      })
      moradorId++
    }

    areasComuns.push(
      { id: `area_${cond.id}_1`, condominioId: cond.id, nome: 'Salão de Festas', descricao: 'Salão para eventos e festas', capacidade: 100, preco: 35000, imagem: condominioImages[0], horario: '08:00-23:00' },
      { id: `area_${cond.id}_2`, condominioId: cond.id, nome: 'Churrasqueira', descricao: 'Área gourmet com churrasqueira', capacidade: 30, preco: 15000, imagem: condominioImages[1], horario: '09:00-22:00' },
      { id: `area_${cond.id}_3`, condominioId: cond.id, nome: 'Piscina', descricao: 'Piscina adulto e infantil', capacidade: 50, preco: 0, imagem: condominioImages[2], horario: '06:00-20:00' },
      { id: `area_${cond.id}_4`, condominioId: cond.id, nome: 'Ginásio', descricao: 'Espaço fitness equipado', capacidade: 20, preco: 0, imagem: condominioImages[0], horario: '06:00-22:00' },
    )
  }

  const receitas: AppData['receitas'] = []
  const despesas: AppData['despesas'] = []
  const pagamentos: AppData['pagamentos'] = []
  const cobrancas: AppData['cobrancas'] = []
  const ocorrencias: AppData['ocorrencias'] = []
  const manutencoes: AppData['manutencoes'] = []
  const equipamentos: AppData['equipamentos'] = []
  const reservas: AppData['reservas'] = []
  const assembleias: AppData['assembleias'] = []
  const visitantes: AppData['visitantes'] = []
  const encomendas: AppData['encomendas'] = []
  const funcionarios: AppData['funcionarios'] = []
  const prestadores: AppData['prestadores'] = []
  const documentos: AppData['documentos'] = []
  const notificacoes: AppData['notificacoes'] = []
  const avisos: AppData['avisos'] = []

  for (const cond of condData) {
    for (let m = 1; m <= 12; m++) {
      receitas.push({
        id: `rec_${cond.id}_${m}`,
        condominioId: cond.id,
        descricao: `Quotas de Condomínio - ${meses[m - 1]}`,
        categoria: 'Quotas',
        valor: randomNum(800000, 2500000),
        data: `2023-${String(m).padStart(2, '0')}-15`,
        status: m < new Date().getMonth() + 1 ? 'recebido' : m === new Date().getMonth() + 1 ? 'pendente' : 'pendente',
      })
      despesas.push({
        id: `desp_${cond.id}_${m}`,
        condominioId: cond.id,
        descricao: `Electricidade - ${meses[m - 1]}`,
        categoria: 'Utilidades',
        valor: randomNum(200000, 600000),
        data: `2023-${String(m).padStart(2, '0')}-10`,
        status: m <= new Date().getMonth() + 1 ? 'pago' : 'pendente',
      })
    }

    const condMoradores = moradores.filter(m => m.condominioId === cond.id)
    for (const mor of condMoradores.slice(0, 10)) {
      for (let m = 1; m <= 3; m++) {
        const date = new Date(2023, 12 - m, randomNum(1, 28))
        pagamentos.push({
          id: `pag_${mor.id}_${m}`,
          moradorId: mor.id,
          condominioId: cond.id,
          valor: randomNum(15000, 50000),
          data: date.toISOString().split('T')[0],
          mes: date.getMonth() + 1,
          ano: date.getFullYear(),
          metodo: randomItem(['multicaixa', 'transferencia', 'dinheiro', 'referencia']),
          status: m < 2 ? 'pago' : m === 2 ? (Math.random() > 0.5 ? 'pago' : 'atrasado') : 'pendente',
        })
      }
      if (Math.random() > 0.6) {
        cobrancas.push({
          id: `cob_${mor.id}`,
          condominioId: cond.id,
          moradorId: mor.id,
          valor: randomNum(15000, 50000),
          mes: new Date().getMonth() + 1,
          ano: new Date().getFullYear(),
          dataVencimento: `2023-${String(new Date().getMonth() + 2).padStart(2, '0')}-05`,
          status: 'enviada',
          metodoEnvio: randomItem(['email', 'whatsapp', 'ambos']),
        })
      }
    }

    for (let o = 1; o <= 5; o++) {
      ocorrencias.push({
        id: `oco_${cond.id}_${o}`,
        condominioId: cond.id,
        titulo: randomItem(['Reclamação de Ruído', 'Fuga de Água', 'Problema Eléctrico', 'Portão Avariado', 'Elevador Parado']),
        descricao: 'Descrição detalhada da ocorrência reportada pelo morador.',
        tipo: randomItem(['ruido', 'vazamento', 'electrico', 'seguranca', 'outro']),
        status: o <= 2 ? 'aberto' : o <= 4 ? 'em_andamento' : 'resolvido',
        prioridade: randomItem(['baixa', 'media', 'alta', 'urgente']),
        moradorId: condMoradores[o % condMoradores.length]?.id,
        dataAbertura: randomDate(2023, 2023),
        fotos: [],
        comentarios: [],
        localizacao: `${cond.nome}, ${randomItem(['Torre A', 'Torre B', 'Garagem', 'Área Comum'])}`,
      })
    }

    equipamentos.push(
      { id: `eq_${cond.id}_1`, condominioId: cond.id, nome: 'Elevador Principal', tipo: 'Elevador', ultimaManutencao: '2023-09-15', proximaManutencao: '2023-12-15', status: 'operacional' },
      { id: `eq_${cond.id}_2`, condominioId: cond.id, nome: 'Grupo Gerador', tipo: 'Gerador', ultimaManutencao: '2023-08-01', proximaManutencao: '2024-02-01', status: 'operacional' },
      { id: `eq_${cond.id}_3`, condominioId: cond.id, nome: 'Bomba de Água', tipo: 'Bomba', ultimaManutencao: '2023-10-01', proximaManutencao: '2024-01-01', status: 'manutencao' },
    )

    for (let m = 1; m <= 3; m++) {
      const data = new Date(2023, 9 + m, 15)
      manutencoes.push({
        id: `man_${cond.id}_${m}`,
        condominioId: cond.id,
        titulo: randomItem(['Inspecção de Elevadores', 'Limpeza de Caixa de Água', 'Verificação de Geradores', 'Manutenção de Câmaras']),
        descricao: 'Manutenção programada conforme plano anual.',
        tipo: m === 1 ? 'preventiva' : 'correctiva',
        equipamento: randomItem(['Elevador', 'Gerador', 'Bomba', 'Câmara']),
        empresaResponsavel: randomItem(['ElevAngola Lda', 'Manutenção Técnica', 'ServiGerais SA']),
        custo: randomNum(50000, 300000),
        dataAgendada: data.toISOString().split('T')[0],
        status: m < 3 ? 'concluida' : 'agendada',
      })
    }

    for (const area of areasComuns.filter(a => a.condominioId === cond.id)) {
      for (let r = 1; r <= 2; r++) {
        const data = new Date(2023, 10, 10 + r * 5)
        const mor = condMoradores[r % condMoradores.length]
        reservas.push({
          id: `res_${cond.id}_${area.id}_${r}`,
          condominioId: cond.id,
          areaId: area.id,
          areaNome: area.nome,
          moradorId: mor?.id || '',
          moradorNome: mor?.nome || 'Desconhecido',
          data: data.toISOString().split('T')[0],
          horaInicio: '14:00',
          horaFim: '22:00',
          status: r === 1 ? 'confirmada' : 'pendente',
          dataSolicitacao: randomDate(2023, 2023),
        })
      }
    }

    assembleias.push({
      id: `asm_${cond.id}_1`,
      condominioId: cond.id,
      titulo: 'Assembleia Geral Ordinária - Prestação de Contas',
      descricao: 'Apresentação do balanço anual e plano de obras.',
      tipo: 'ordinaria',
      data: '2023-11-20',
      horaInicio: '19:00',
      horaFim: '21:00',
      local: `Salão de Festas - ${cond.nome}`,
      formato: 'presencial',
      status: 'agendada',
      pauta: ['Prestação de contas 2023', 'Orçamento 2024', 'Reforma da fachada'],
      votacoes: [
        { id: `vot_${cond.id}_1`, assembleiaId: `asm_${cond.id}_1`, titulo: 'Aprovação do Orçamento 2024', descricao: 'Votação do orçamento anual proposto', dataInicio: '2023-11-20', dataFim: '2023-12-20', status: 'ativa', votosSim: 45, votosNao: 12, abstencoes: 5 },
        { id: `vot_${cond.id}_2`, assembleiaId: `asm_${cond.id}_1`, titulo: 'Reforma da Fachada', descricao: 'Aprovação do projecto de reforma', dataInicio: '2023-11-20', dataFim: '2023-12-20', status: 'ativa', votosSim: 52, votosNao: 8, abstencoes: 2 },
      ],
      presencas: 62,
      totalMoradores: cond.numUnidades,
    })

    for (let v = 1; v <= 3; v++) {
      visitantes.push({
        id: `vis_${cond.id}_${v}`,
        condominioId: cond.id,
        nome: randomItem(nomes),
        documento: `BI${String(randomNum(100000, 9999999))}`,
        telefone: `+244 9${randomNum(11, 99)} ${randomNum(100, 999)} ${randomNum(100, 999)}`,
        unidadeDestino: `${randomItem(['Torre A', 'Torre B'])} - ${randomNum(1, 20)}${randomItem(['A', 'B', 'C'])}`,
        dataEntrada: randomDate(2023, 2023),
        status: Math.random() > 0.5 ? 'presente' : 'ausente',
      })
    }

    for (let e = 1; e <= 3; e++) {
      encomendas.push({
        id: `enc_${cond.id}_${e}`,
        condominioId: cond.id,
        moradorNome: randomItem(nomes),
        unidade: `${randomItem(['Torre A', 'Torre B'])} - ${randomNum(1, 20)}${randomItem(['A', 'B', 'C'])}`,
        transportadora: randomItem(['DHL', 'UPS', 'FedEx', 'SpeedLlog']),
        descricao: randomItem(['Encomenda', 'Documentos', 'Pacote pequeno', 'Caixa grande']),
        dataRecebimento: randomDate(2023, 2023),
        status: Math.random() > 0.4 ? 'pendente' : 'retirada',
      })
    }

    funcionarios.push(
      { id: `func_${cond.id}_1`, condominioId: cond.id, nome: 'João Porteiro', cargo: 'Porteiro', telefone: '+244 923 456 789', email: 'joao.porteiro@email.com', bi: '0054321LA123', salario: 85000, dataAdmissao: '2021-03-01', turno: 'Diurno', foto: moradorFotos[2] },
      { id: `func_${cond.id}_2`, condominioId: cond.id, nome: 'Maria Limpeza', cargo: 'Faxineira', telefone: '+244 933 456 789', email: 'maria.limpeza@email.com', bi: '0076543LA456', salario: 45000, dataAdmissao: '2022-06-15', turno: 'Matinal', foto: moradorFotos[3] },
      { id: `func_${cond.id}_3`, condominioId: cond.id, nome: 'António Segurança', cargo: 'Segurança', telefone: '+244 943 456 789', email: 'antonio.seg@email.com', bi: '0098765LA789', salario: 95000, dataAdmissao: '2020-11-01', turno: 'Noturno', foto: moradorFotos[4] },
    )

    prestadores.push(
      { id: `prest_${cond.id}_1`, condominioId: cond.id, nome: 'ElevAngola Lda', servico: 'Elevadores', contacto: '+244 912 345 678', email: 'geral@elevangola.co.ao', contrato: 'Manutenção Anual', valorMensal: 180000, dataVencimento: '2023-12-31', dataInicio: '2022-01-01', status: 'activo' },
      { id: `prest_${cond.id}_2`, condominioId: cond.id, nome: 'SegurAngola SA', servico: 'Segurança', contacto: '+244 922 345 678', email: 'info@segurangola.co.ao', contrato: 'Vigilância 24h', valorMensal: 450000, dataVencimento: '2023-12-31', dataInicio: '2021-06-01', status: 'activo' },
      { id: `prest_${cond.id}_3`, condominioId: cond.id, nome: 'LimpeMax', servico: 'Limpeza', contacto: '+244 932 345 678', email: 'contacto@limpemax.co.ao', contrato: 'Limpeza Diária', valorMensal: 250000, dataVencimento: '2023-11-30', dataInicio: '2023-01-01', status: 'activo' },
    )

    if (cond.id === 'cond_1') {
      documentos.push(
        { id: `doc_${cond.id}_1`, condominioId: cond.id, nome: 'Regulamento Interno.pdf', categoria: 'Regulamentos', descricao: 'Regulamento interno do condomínio', dataUpload: '2023-01-15', tamanho: '2.4 MB', url: '#' },
        { id: `doc_${cond.id}_2`, condominioId: cond.id, nome: 'Acta Assembleia 2023.pdf', categoria: 'Actas', descricao: 'Acta da assembleia geral ordinária', dataUpload: '2023-03-20', tamanho: '1.1 MB', url: '#' },
        { id: `doc_${cond.id}_3`, condominioId: cond.id, nome: 'Contrato Empresa Limpeza.pdf', categoria: 'Contratos', descricao: 'Contrato de prestação de serviços', dataUpload: '2023-01-01', tamanho: '3.2 MB', url: '#' },
      )
    }

    avisos.push(
      { id: `aviso_${cond.id}_1`, condominioId: cond.id, titulo: 'Corte Programado de Água', mensagem: 'Devido a manutenção preventiva no reservatório, haverá interrupção no fornecimento de água no dia 25/11 das 09h às 14h.', tipo: 'agua', data: randomDate(2023, 2023), autor: 'Administração', canal: ['push', 'whatsapp'] },
      { id: `aviso_${cond.id}_2`, condominioId: cond.id, titulo: 'Assembleia Geral Mensal', mensagem: 'Convocamos todos os condóminos para a reunião mensal no próximo sábado.', tipo: 'reuniao', data: randomDate(2023, 2023), autor: 'Síndico', canal: ['email'] },
    )

    for (const mor of condMoradores.slice(0, 5)) {
      notificacoes.push({
        id: `not_${cond.id}_${mor.id}`,
        usuarioId: mor.id,
        titulo: 'Lembrete de Pagamento',
        mensagem: `A sua quota de condomínio vence em 5 dias.`,
        tipo: 'cobranca',
        lida: Math.random() > 0.5,
        data: randomDate(2023, 2023),
      })
    }
  }

  const usuarios: AppData['usuarios'] = [
    { id: 'user_1', nome: 'Ricardo Silva', email: 'admin@luxcondo.co.ao', password: '123456', perfil: 'super_admin', foto: moradorFotos[0] },

    { id: 'user_2', nome: 'Ana Administradora', email: 'ana@luxcondo.co.ao', password: '123456', perfil: 'admin', condominioId: 'cond_1', foto: moradorFotos[1] },
    { id: 'user_3', nome: 'Carlos Porteiro', email: 'porteiro1@luxcondo.co.ao', password: '123456', perfil: 'porteiro', condominioId: 'cond_1', foto: moradorFotos[2] },
    { id: 'user_m1', nome: 'João Silva', email: 'morador1@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_1', apartamentoId: 'ap_1', foto: moradorFotos[3] },
    { id: 'user_m2', nome: 'Maria Santos', email: 'morador2@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_1', apartamentoId: 'ap_2', foto: moradorFotos[4] },
    { id: 'user_m3', nome: 'Carlos Mendes', email: 'morador3@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_1', apartamentoId: 'ap_3', foto: moradorFotos[5] },

    { id: 'user_4', nome: 'Bruno Administrador', email: 'admin2@luxcondo.co.ao', password: '123456', perfil: 'admin', condominioId: 'cond_2', foto: moradorFotos[1] },
    { id: 'user_5', nome: 'Daniel Porteiro', email: 'porteiro2@luxcondo.co.ao', password: '123456', perfil: 'porteiro', condominioId: 'cond_2', foto: moradorFotos[2] },
    { id: 'user_m4', nome: 'Paula Costa', email: 'morador4@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_2', apartamentoId: 'ap_16', foto: moradorFotos[3] },
    { id: 'user_m5', nome: 'António Lopes', email: 'morador5@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_2', apartamentoId: 'ap_17', foto: moradorFotos[4] },
    { id: 'user_m6', nome: 'Sofia Martins', email: 'morador6@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_2', apartamentoId: 'ap_18', foto: moradorFotos[5] },

    { id: 'user_6', nome: 'Hugo Administrador', email: 'admin3@luxcondo.co.ao', password: '123456', perfil: 'admin', condominioId: 'cond_3', foto: moradorFotos[0] },
    { id: 'user_7', nome: 'Fernando Porteiro', email: 'porteiro3@luxcondo.co.ao', password: '123456', perfil: 'porteiro', condominioId: 'cond_3', foto: moradorFotos[2] },
    { id: 'user_m7', nome: 'Ricardo Oliveira', email: 'morador7@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_3', apartamentoId: 'ap_31', foto: moradorFotos[3] },
    { id: 'user_m8', nome: 'Isabel Pereira', email: 'morador8@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_3', apartamentoId: 'ap_32', foto: moradorFotos[4] },

    { id: 'user_8', nome: 'Luísa Administradora', email: 'admin4@luxcondo.co.ao', password: '123456', perfil: 'admin', condominioId: 'cond_4', foto: moradorFotos[1] },
    { id: 'user_9', nome: 'Miguel Porteiro', email: 'porteiro4@luxcondo.co.ao', password: '123456', perfil: 'porteiro', condominioId: 'cond_4', foto: moradorFotos[2] },
    { id: 'user_m9', nome: 'Fernando Gomes', email: 'morador9@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_4', apartamentoId: 'ap_46', foto: moradorFotos[5] },
    { id: 'user_m10', nome: 'Lúcia Rodrigues', email: 'morador10@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_4', apartamentoId: 'ap_47', foto: moradorFotos[3] },

    { id: 'user_10', nome: 'Pedro Administrador', email: 'admin5@luxcondo.co.ao', password: '123456', perfil: 'admin', condominioId: 'cond_5', foto: moradorFotos[0] },
    { id: 'user_11', nome: 'Rui Porteiro', email: 'porteiro5@luxcondo.co.ao', password: '123456', perfil: 'porteiro', condominioId: 'cond_5', foto: moradorFotos[2] },
    { id: 'user_m11', nome: 'Miguel Almeida', email: 'morador11@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_5', apartamentoId: 'ap_61', foto: moradorFotos[4] },
    { id: 'user_m12', nome: 'Catarina Sousa', email: 'morador12@email.com', password: '123456', perfil: 'morador', condominioId: 'cond_5', apartamentoId: 'ap_62', foto: moradorFotos[5] },
  ]

  return {
    condominios: condData,
    blocos,
    apartamentos,
    moradores,
    usuarios,
    receitas,
    despesas,
    pagamentos,
    cobrancas,
    ocorrencias,
    manutencoes,
    equipamentos,
    reservas,
    areasComuns,
    assembleias,
    visitantes,
    encomendas,
    funcionarios,
    prestadores,
    documentos,
    notificacoes,
    avisos,
  }
}
