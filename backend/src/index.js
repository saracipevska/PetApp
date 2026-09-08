require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { waitForDb } = require('./db');
const petsRouter = require('./routes/pets');

const app = express();

app.use(cors());
// Pet photos are sent as base64 data URLs from the browser, so allow a larger body.
app.use(express.json({ limit: '5mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/pets', petsRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 8081;

// Only start listening (and only wait on the DB) when run directly - lets
// tests `require('./index')`-style setups import the app without a real DB.
if (require.main === module) {
  waitForDb()
    .then(() => {
      app.listen(PORT, () => console.log(`PetApp backend listening on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Fatal: could not start server', err);
      process.exit(1);
    });
}

module.exports = app;
