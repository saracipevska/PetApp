-- Schema for PetApp. Applied automatically on first Postgres container start
-- (mounted into /docker-entrypoint-initdb.d) or can be run manually with psql.

CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  name TEXT,
  type TEXT,
  breed TEXT,
  color TEXT,
  gender TEXT,
  age TEXT,
  location TEXT,
  date TEXT,
  description TEXT,
  contact TEXT,
  image TEXT,
  status TEXT NOT NULL DEFAULT 'adoption' CHECK (status IN ('adoption', 'lost', 'found')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pets_status ON pets(status);

CREATE TABLE IF NOT EXISTS adoption_requests (
  id SERIAL PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  pet_type TEXT,
  living TEXT,
  other_pets TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
