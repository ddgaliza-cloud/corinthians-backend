import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({ logger: true })

const PORT = process.env.PORT || 3333

let jogadores = [
  {
    id: 1,
    nome: 'Yuri Alberto',
    numero: 9,
    posicao: 'Atacante',
    idade: 24
  },
  {
    id: 2,
    nome: 'Rodrigo Garro',
    numero: 10,
    posicao: 'Meia',
    idade: 27
  }
]

fastify.get('/', async () => {
  return {
    mensagem: 'API do Corinthians funcionando!'
  }
})

fastify.get('/corinthians', async () => {
  return {
    clube: 'Corinthians',
    estadio: 'Neo Química Arena',
    cidade: 'São Paulo'
  }
})

fastify.get('/jogadores', async () => {
  return jogadores
})

fastify.post('/jogadores', async (request) => {

  const novoJogador = request.body

  jogadores.push(novoJogador)

  return jogadores
})

fastify.listen({
  port: PORT
}).then(() => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})