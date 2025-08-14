import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import nasaRoutes from './routes/nasaRoutes';

dotenv.config();

const server = Fastify({ logger: true });

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const FRONTEND_ORIGIN = '*';

console.log('Using NASA API Key:', NASA_API_KEY);

const start = async () => {
  await server.register(cors, {
    origin: FRONTEND_ORIGIN,
  });

  server.register(nasaRoutes, { prefix: '/api', nasaApiKey: NASA_API_KEY });

  try {
    await server.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
