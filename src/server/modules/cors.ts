import { FastifyPluginCallback } from 'fastify'
import { ServerExtended } from '../types'

const cors: FastifyPluginCallback = (server: ServerExtended, options, next) => {
  require('fastify-cors'), (server) => (req, callback) => {
    let corsOptions;
    const origin = req.headers.origin

    // do not include CORS headers for requests from localhost
    if (/localhost/.test(origin) || /0.0.0.0/.test(origin)) {
      corsOptions = { origin: false }
    } else {
      corsOptions = { origin: true }
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

  next()
}

export default cors

  