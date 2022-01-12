import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyError,
  FastifyReply, 
} from 'fastify'
import { EXTFastifyRequest } from '../types'

const AuthPlugin = fp((server: FastifyInstance, opts: FastifyPluginOptions, next: (error?: FastifyError) => void) => {
  server.register(require('fastify-jwt'), {
    secret: 'change this to something secret'
  })
  
  server.decorate('authenticate', async (req: EXTFastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.send(err)
    }
  })

  next()
})

export default AuthPlugin