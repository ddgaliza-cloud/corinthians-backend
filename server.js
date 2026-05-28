
import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

let jogadores = [
  {
    id: 1,
    nome: "Yuri Alberto",
    numero: 9,
    posicao: "Atacante",
    idade: 24
  },
  {
    id: 2,
    nome: "Rodrigo Garro",
    numero: 10,
    posicao: "Meia",
    idade: 27
  }
]

fastify.get('/', async () => {
  return { mensagem: 'API do Corinthians funcionando!' }
})

fastify.get('/jogadores', async () => {
  return jogadores
})

fastify.post('/jogadores', async (request) => {
  const novo = {
    id: jogadores.length + 1,
    ...request.body
  }

  jogadores.push(novo)

  return {
    mensagem: 'Jogador cadastrado!',
    jogador: novo
  }
})

fastify.put('/jogadores/:id', async (request) => {
  const id = Number(request.params.id)
  const dados = request.body

  jogadores = jogadores.map(j =>
    j.id === id ? { ...j, ...dados } : j
  )

  return { mensagem: 'Jogador atualizado!' }
})

fastify.delete('/jogadores/:id', async (request) => {
  const id = Number(request.params.id)

  jogadores = jogadores.filter(j => j.id !== id)

  return { mensagem: 'Jogador removido!' }

})
fastify.get('/corinthians', async () => {
  return {
    clube: 'Corinthians',
    estadio: 'Neo Química Arena',
    cidade: 'São Paulo'
  }
})
fastify.listen({
  port: 3333
}).then(() => {
  console.log('Servidor rodando em http://localhost:3333')
})
