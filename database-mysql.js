import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DatabaseMySQL {
  async list(search) {
    let jogadores;

    if (search) {
      jogadores = await sql.execute(
        'SELECT * FROM jogadores WHERE NOME LIKE ?',
        [`%${search}%`]
      );
    } else {
      jogadores = await sql.execute('SELECT * FROM jogadores');
    }

    return jogadores[0];
  }

  async create(jogador) {
    const jogadorId = randomUUID();
    const { NOME, description, NUMCAMISA } = jogador;

    await sql.execute(
      'INSERT INTO jogadores (id, NOME, description, NUMCAMISA) VALUES (?, ?, ?, ?)',
      [jogadorId, NOME, description, NUMCAMISA]
    );
  }

  async update(id, jogador) {
    const { NOME, description, NUMCAMISA } = jogador;

    await sql.execute(
      'UPDATE jogadores SET NOME = ?, description = ?, NUMCAMISA = ? WHERE id = ?',
      [NOME, description, NUMCAMISA, id]
    );
  }

  async delete(id) {
    await sql.execute('DELETE FROM jogadores WHERE id = ?', [id]);
  }
}