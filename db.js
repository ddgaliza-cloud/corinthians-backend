import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const { MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE } = process.env;

const pool = mysql.createPool({
  host: MYSQLHOST,
  port: MYSQLPORT || 3306,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const sql = pool;