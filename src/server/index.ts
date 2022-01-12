import fastify from 'fastify'
import db from './plugins/db'
import auth from './plugins/auth'
import registerRoutes from './register-routes';
import { docsConfig } from './open-api/configs'
import { generateSwaggerApi } from './open-api/helpers'
import cors from './modules/cors'

async function createServer() {
  const server = fastify({ logger: { prettyPrint: true } })

  server.register(cors)
  server.register(db)
  server.register(auth)
  server.register(require('fastify-oas'), docsConfig)
  
  await registerRoutes(server)
  await generateSwaggerApi()

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  /*
  generate temporary token to be used in app
  server.ready(() => {
    const token = server.jwt.sign({ user_id: 'swr_user_id' })
    console.log(token)
  })
  */

  return server
}

export default createServer