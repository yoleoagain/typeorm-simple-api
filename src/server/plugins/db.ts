import { ConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'
import 'reflect-metadata'
import fp from 'fastify-plugin'
import { createConnection } from 'typeorm'
import { entities, Item, Prices } from '../modules/entities'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config()

export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  migrationsRun: true,
  //@ts-ignore
  options: { encrypt: true },
  entities: entities,
  namingStrategy: new SnakeNamingStrategy()
}

const DBPlugin = fp(async server => {
  try {
    const connection = await createConnection(config)
    console.log('database connected')

    server.decorate('db', {
      items: connection.getRepository(Item),
      prices: connection.getRepository(Prices),
    })
  } catch (error) {
    console.log(error)
    console.log('make sure you have set .env variables - see .env.sample')
  }
})

export default DBPlugin
