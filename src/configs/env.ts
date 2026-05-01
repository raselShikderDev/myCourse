import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PBACKEND_URLORT: process.env.BACKEND_URL,
};

const required = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    console.warn(`⚠ Warning: env var ${key} is not set`);
  }
}
