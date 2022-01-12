import createServer from './server'
import dotenv from 'dotenv'
import { saveSwaggerSchemaToJSON } from './server/open-api/helpers'

(async () => {
  dotenv.config()

  const PORT = process.env.PORT || '3000'
  const HOST = process.env.HOST || '0.0.0.0'
  const server = await createServer()

  await server.listen(+PORT, HOST, (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
  })

  await saveSwaggerSchemaToJSON()
})()