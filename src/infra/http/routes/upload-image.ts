import { uploadImage } from '@/app/functions/upload-image'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const MAXIMUN_FILE_SIZE = 1024 * 1024 * 4 // 4mb

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        tags: ['uploads'],
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({ url: z.string() }).describe('Image uploaded'),
          400: z.object({ message: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Upload already exists.'),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fileSize: MAXIMUN_FILE_SIZE,
        },
      })

      if (!uploadedFile)
        return reply.status(400).send({ message: 'File is required' })

      const result = await uploadImage({
        fileName: uploadedFile.filename,
        contentType: uploadedFile.mimetype,
        contentStream: uploadedFile.file,
      })

      // Depois que consome a stream verifica se o arquivo foi totalmente enviado
      if (uploadedFile.file.truncated) {
        return reply.status(400).send({
          message: 'File size limit reached.',
        })
      }

      if (isRight(result)) {
        const { url } = unwrapEither(result)

        return reply.status(201).send({ url })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'InvalidFileFormat':
          return reply.status(400).send({ message: error.message })
      }
    }
  )
}
