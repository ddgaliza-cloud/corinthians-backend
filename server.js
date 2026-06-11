console.log("TESTE DE GIT");
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

// Rota inicial
fastify.get('/', async () => {
  return {
    mensagem: 'API do Corinthians funcionando!'
  }
})

// LISTAR
fastify.get('/jogadores', async () => {
  return jogadores
})

// BUSCAR POR ID
fastify.get('/jogadores/:id', async (request) => {
  const id = Number(request.params.id)

  const jogador = jogadores.find(j => j.id === id)

  if (!jogador) {
    return { mensagem: 'Jogador não encontrado!' }
  }

  return jogador
})

// CADASTRAR
fastify.post('/jogadores', async (request) => {
  const novoJogador = {
    id: jogadores.length + 1,
    ...request.body
  }

  jogadores.push(novoJogador)

  return {
    mensagem: 'Jogador cadastrado com sucesso!',
    jogador: novoJogador
  }
})

// ATUALIZAR
fastify.put('/jogadores/:id', async (request) => {
  const id = Number(request.params.id)
  const dados = request.body

  jogadores = jogadores.map(jogador =>
    jogador.id === id
      ? { ...jogador, ...dados }
      : jogador
  )

  return {
    mensagem: 'Jogador atualizado com sucesso!'
  }
})

// EXCLUIR
fastify.delete('/jogadores/:id', async (request) => {
  const id = Number(request.params.id)

  jogadores = jogadores.filter(jogador => jogador.id !== id)

  return {
    mensagem: 'Jogador removido com sucesso!'
  }
})

fastify.listen({
  port: PORT
}).then(() => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})