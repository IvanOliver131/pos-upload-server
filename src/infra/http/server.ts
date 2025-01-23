import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const server = fastify()

server.register(fastifyCors, { origin: '*' })

const serverConfig = { port: 3333, host: '0.0.0.0' }

server.listen(serverConfig).then(() => {
  console.log('HTTP server running!')
})
