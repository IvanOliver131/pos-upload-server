import { fastify } from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
} from 'fastify-type-provider-zod'

import { uploadImageRoute } from './routes/upload-image'

import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { transformSwaggerSchema } from './routes/transform-swagger-schema'
import { getUploadsRoute } from './routes/get-uploads'
import { exportUploadsRoute } from './routes/export-uploads'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  // Enviar o erro p/ alguma ferramenta de observabilidade (Senty/Datadog/Grafana/OTel)
  console.error(error)

  return reply.status(500).send({ message: 'Internal server errror.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// ROTAS
server.register(uploadImageRoute)
server.register(getUploadsRoute)
server.register(exportUploadsRoute)

const serverConfig = { port: 3333, host: '0.0.0.0' }

server.listen(serverConfig).then(() => {
  console.log('HTTP server running!')
})
