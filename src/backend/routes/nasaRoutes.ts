import type { FastifyInstance } from 'fastify';
import fetch from 'node-fetch';
import type { Neo } from '../../types/neo';

type NasaRoutesOptions = {
  nasaApiKey: string;
}

async function nasaRoutes(
  server: FastifyInstance,
  options: NasaRoutesOptions
) {
  server.get('/neos', async (request, reply) => {
    const { start_date, end_date } = request.query as { start_date: string; end_date: string };
    const apiKey = options.nasaApiKey;
    const apiUrl = process.env.NASA_API_URL || 'https://api.nasa.gov/neo/rest/v1';
    const url = `${apiUrl}/feed?start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`;

    const response = await fetch(url);
    const data: any = await response.json();

    const neos: Neo[] = [];
    Object.values(data.near_earth_objects).forEach((day: any) => {
      day.forEach((obj: any) => {
        neos.push({
          name: obj.name,
          size: obj.estimated_diameter.kilometers.estimated_diameter_max,
          closest_approach: obj.close_approach_data[0].miss_distance.kilometers,
          velocity: obj.close_approach_data[0].relative_velocity.kilometers_per_hour,
        });
      });
    });

    return neos;
  });
}

export default nasaRoutes;
