const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'petapp',
  password: process.env.PGPASSWORD || 'petapp',
  database: process.env.PGDATABASE || 'petapp'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
});

async function waitForDb(retries = 20, delayMs = 1500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to Postgres');
      return;
    } catch (err) {
      console.log(`Postgres not ready (attempt ${attempt}/${retries}): ${err.message}`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('Could not connect to Postgres after multiple retries');
}

module.exports = { pool, waitForDb };
