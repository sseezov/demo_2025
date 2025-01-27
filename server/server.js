import Fastify from 'fastify'
const fastify = Fastify()
import client from './db.js'

await client.connect()

fastify.get('/partners', async (req, res) => {
  try {
    const response = await client.query(`SELECT T1.*,
    CASE WHEN sum(T2.production_quantity) > 300000 THEN 15
    WHEN sum(T2.production_quantity) > 50000 THEN 10
    WHEN sum(T2.production_quantity) > 10000 THEN 5
    ELSE 0 
    END as discount
    from partners as T1
    LEFT JOIN sales as T2 on T1.id = T2.partner_id
    GROUP BY T1.id`)
    await res.send(response.rows)
  } catch (e) {
    await reply.send(e)
  }
})

fastify.post('/partners', async (req, res) => {
  const { type, name, ceo, email, phone, address, rating } = req.body;
  try {
    await client.query(`INSERT into partners (organization_type, name, ceo, email, phone, address, rating) values('${type}', '${name}', '${ceo}', '${email}', '${phone}', '${address}', ${rating})`)
    await res.send('ok')
  } catch(e){
    console.log(e)
    await res.send('error')
  }
})

fastify.put('/partners', async (req, res) => {
  const { id, type, name, ceo, email, phone, address, rating } = req.body;
  try {
    console.log(req.body)

    await client.query(`UPDATE partners
      SET name = '${name}', organization_type = '${type}', ceo='${ceo}', email='${email}', phone='${phone}', address='${address}', rating='${rating}'
      WHERE partners.id = ${id};`)
    await res.send('ok')
  } catch(e){
    console.log(e)
    await res.send('error')
  }
})

try {
  console.log(`server is listening on port 3000`)
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}