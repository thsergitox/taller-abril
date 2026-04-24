import type { FastifyPluginAsync } from 'fastify'

const healthRoutes: FastifyPluginAsync = async (healthRoutes) => {
  healthRoutes.get(
    '',
    {
      schema: {
        tags: ['health'],
        summary: 'Verificar que la API esté disponible',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string' },
              uptime: { type: 'number' },
            },
            required: ['status', 'timestamp', 'uptime'],
            additionalProperties: false,
          },
        },
      },
    },
    async () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }),
  )
}

export default healthRoutes