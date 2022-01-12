import { listPricesSchema, postItemPricesSchema, patchItemPricesSchema } from './schema'
import { getRepository } from 'typeorm'
import { Prices } from '../../modules/entities'
import { FastifyPluginCallback } from 'fastify'
import { ServerExtended } from '../../types'

type PriceBody = { 
  item_id: number
  price: number
  price_type_id: number
}

const route: FastifyPluginCallback = (server: ServerExtended, options, next) => {
  server.get(
    '/item_prices',
    { 
      schema: listPricesSchema,
      // preValidation: [server.authenticate]
    },
    async (req, res) => {
      req.log.info('list products from db')
      const prices = await getRepository(Prices).find()
      
      res.send(prices)
    }
  )

  server.post<{ Body: PriceBody }>(
    '/item_prices',
    { 
      schema: postItemPricesSchema,
      // preValidation: [server.authenticate]
    },
    async (req, res) => {
      const { item_id, price, price_type_id } = req.body

      if (!item_id || !price || !price_type_id) {
        req.log.info(`tem_id, price, price_type_id, is required`)
        return res.code(404).send(`tem_id, price, price_type_id, is required`)
      }

      req.log.info(`save price to db`)

      const item = await getRepository(Prices)
        .save({ item_id, price, price_type_id })

      res.code(201).send(item)
    }
  )

    server.patch<{ Body: PriceBody }>(
    '/item_prices',
    { 
      schema: patchItemPricesSchema,
      // preValidation: [server.authenticate] 
    },
    async (req, res) => {
      const { item_id, price, price_type_id } = req.body

      if (!item_id || !price || !price_type_id) {
        req.log.info(`tem_id, price, price_type_id, is required`)
        return res.code(404).send(`tem_id, price, price_type_id, is required`)
      }

      req.log.info(`save price to db`)

      const priceRep = await getRepository(Prices)
      const itemPrice = await priceRep.findOneOrFail({ where: { 
        price_type_id, 
        item_id
      } })

      if (itemPrice){
        const newPrice = { ...itemPrice, price }

        await priceRep.save(newPrice)
        res.code(200).send(newPrice)
      } else {
        res.code(400).send("{error: 'price type not found'}")
      }

      res.code(200).send(priceRep)
    }
  )

  next()
}

export default route