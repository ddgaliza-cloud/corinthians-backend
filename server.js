import { fastify } from 'fastify';
import { DatabaseMySQL } from './database-mysql.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3333;
const server = fastify({ logger: true });
const database = new DatabaseMySQL();

server.get('/', async () => {
  return { message: 'API do Corinthians rodando com MySQL!' };
});

// Criar jogador
server.post('/jogadores', async (request, reply) => {
  await database.create(request.body);
  return reply.status(201).send();
});

// Listar jogadores
server.get('/jogadores', async (request, reply) => {
  const { search } = request.query;
  const jogadores = await database.list(search);
  return jogadores;
});

// Atualizar jogador
server.put('/jogadores/:id', async (request, reply) => {
  const { id } = request.params;
  await database.update(id, request.body);
  return reply.status(204).send();
});

// Deletar jogador
server.delete('/jogadores/:id', async (request, reply) => {
  const { id } = request.params;
  await database.delete(id);
  return reply.status(204).send();
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor rodando em ${address}`);
});