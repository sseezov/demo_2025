import pg from 'pg'
const { Client } = pg

const user = 'postgres';
const password = '219219';
const host = 'localhost';
const port = '5432';
const database = 'demo_2025';

const client = new Client({
  user, password, host, port, database
})

export default client;