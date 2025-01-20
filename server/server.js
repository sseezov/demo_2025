import Fastify from 'fastify'
const fastify = Fastify()
import client from './db.js'

await client.connect()

fastify.get('/partners', async (request, reply) => {
  try {
    const partners = await client.query(`SELECT * FROM partners;`)
    const sales = await client.query(`SELECT * FROM sales;`)

    const partnersWithDiscount = partners.rows.map((partner) => {
      const total = sales.rows.reduce((acc, elem) => {
        if (elem.partner_id === partner.id) {
          return acc + Number(elem.production_quantity)
        }
        return acc
      });

      let discount = 0;

      if (total > 300000) {
        discount = 15
      } else if (total > 50000) {
        discount = 10
      } else if (total > 10000) {
        discount = 5
      }
      return { ...partner, discount }
    })
    await reply.send(partnersWithDiscount)
  } catch (e) {
    console.log(e)
  }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}