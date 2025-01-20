import Fastify from 'fastify'
const fastify = Fastify()
import client from './db.js'

await client.connect()

fastify.get('/partners', async (request, reply) => {
  const res = await client.query('SELECT * from partners')
  await reply.send(res.rows)
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}