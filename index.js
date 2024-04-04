let participantes = [
  {
    nome: "Cauê Risonho",
    email: "caue@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 20),
    dataCheckIn: new Date(2024, 2, 27, 22, 00)
  },
  {
    nome: "Otavio Silva",
    email: "otavio@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 19, 20),
    dataCheckIn: new Date(2024, 2, 26, 22, 30)
  },
  {
    nome: "João Santos",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 19, 20),
    dataCheckIn: new Date(2024, 2, 29, 23, 45)
  },
  {
    nome: "Ana Oliveira",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 19, 20),
    dataCheckIn: new Date(2024, 3, 2, 1, 20)
  },
  {
    nome: "Larissa Lima",
    email: "larissa@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 19, 20),
    dataCheckIn: new Date(2024, 3, 3, 2, 30)
  },
  {
    nome: "Marcos Oliveira",
    email: "marcos@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 19, 20),
    dataCheckIn: new Date(2024, 3, 4, 3, 40)
  },
  {
    nome: "Juliana Costa",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 19, 20),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao =  dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  //Condicional
  if (participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  //Estrutura de repetição - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  //Substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
} 

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante =  {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if (participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(mensagemConfirmacao) == false ){
    return
  }

  //encontar o participante dentre da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participantes
  atualizarLista(participantes)
}