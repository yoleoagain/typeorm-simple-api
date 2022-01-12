import { FastifyRequest, FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

export type ServerExtended = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> & { authenticate: () => void }
export type EXTFastifyRequest = FastifyRequest & { jwtVerify: () => void }

