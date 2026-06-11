import { sql } from './db.js';

await sql.execute(`
  CREATE TABLE IF NOT EXISTS jogadores (
    id VARCHAR(36) PRIMARY KEY,
    NOME VARCHAR(255) NOT NULL,
    description TEXT,
    NUMCAMISA INT NOT NULL
  )
`);

console.log('Tabela jogadores!');