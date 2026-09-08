const express = require('express');
const { pool } = require('../db');

const router = express.Router();

const PET_STATUSES = ['adoption', 'lost', 'found'];

// GET /api/pets/adoption - pets currently listed for adoption
router.get('/adoption', async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM pets WHERE status = 'adoption' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load adoption pets' });
  }
});

// GET /api/pets/lost - pets reported lost
router.get('/lost', async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM pets WHERE status = 'lost' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load lost pets' });
  }
});

// GET /api/pets/adoption-requests - list submitted adoption requests
router.get('/adoption-requests', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM adoption_requests ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load adoption requests' });
  }
});

// POST /api/pets/adoption-requests - submit a request to adopt a pet
router.post('/adoption-requests', async (req, res) => {
  const { fullName, email, phone, petType, living, otherPets, reason } = req.body || {};
  if (!fullName || !email) {
    return res.status(400).json({ error: 'fullName and email are required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO adoption_requests (full_name, email, phone, pet_type, living, other_pets, reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [fullName, email, phone, petType, living, otherPets, reason]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save adoption request' });
  }
});

// POST /api/pets - create a pet listing (used for both "have for adoption" and "lost" forms)
router.post('/', async (req, res) => {
  const {
    name, type, breed, color, gender, age, location, date, description, contact, image
  } = req.body || {};
  const status = PET_STATUSES.includes(req.body?.status) ? req.body.status : 'adoption';

  try {
    const { rows } = await pool.query(
      `INSERT INTO pets (name, type, breed, color, gender, age, location, date, description, contact, image, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [name, type, breed, color, gender, age, location, date, description, contact, image, status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save pet' });
  }
});

module.exports = router;
