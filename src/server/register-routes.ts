import { FastifyInstance } from 'fastify'
import itemsHandler from './modules/items/routes'
import pricesHandler from './modules/prices/routes'
import priceTypesHandler from './modules/price-types/routes'

export default async function registerRoutes(server: FastifyInstance) {
  await server.register(itemsHandler)
  await server.register(pricesHandler)
  await server.register(priceTypesHandler)
}
