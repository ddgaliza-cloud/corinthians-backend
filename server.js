console.log("TESTE DE GIT");
import Fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({ logger: true })

const PORT = process.env.PORT || 3333

let videos = [
  {
    id: 1,
    titulo: 'Gol do Yuri Alberto',
    descricao: 'Melhores momentos do jogo',
    url: 'https://youtube.com/video1'
  },
  {
    id: 2,
    titulo: 'Assistências do Garro',
    descricao: 'Lances da temporada',
    url: 'https://youtube.com/video2'
  }
]

// Rota inicial
fastify.get('/', async () => {
  return {
    mensagem: 'API de Vídeos do Corinthians funcionando!'
  }
})

// LISTAR
fastify.get('/videos', async () => {
  return videos
})

// BUSCAR POR ID
fastify.get('/videos/:id', async (request) => {
  const id = Number(request.params.id)

  const video = videos.find(v => v.id === id)

  if (!video) {
    return { mensagem: 'Vídeo não encontrado!' }
  }

  return video
})

// CADASTRAR
fastify.post('/videos', async (request) => {
  const novoVideo = {
    id: videos.length + 1,
    ...request.body
  }

  videos.push(novoVideo)

  return {
    mensagem: 'Vídeo cadastrado com sucesso!',
    video: novoVideo
  }
})

// ATUALIZAR
fastify.put('/videos/:id', async (request) => {
  const id = Number(request.params.id)
  const dados = request.body

  videos = videos.map(video =>
    video.id === id
      ? { ...video, ...dados }
      : video
  )

  return {
    mensagem: 'Vídeo atualizado com sucesso!'
  }
})

// EXCLUIR
fastify.delete('/videos/:id', async (request) => {
  const id = Number(request.params.id)

  videos = videos.filter(video => video.id !== id)

  return {
    mensagem: 'Vídeo removido com sucesso!'
  }
})

fastify.listen({
  port: PORT
}).then(() => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})