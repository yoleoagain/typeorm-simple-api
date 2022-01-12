import { listPriceTypesSchemaSchema, postItemPricesSchema, patchItemPricesSchema } from './schema'
import { getRepository } from 'typeorm'
import { PriceType } from '../../modules/entities'
import { FastifyPluginCallback } from 'fastify'
import { ServerExtended } from '../../types'

type PriceBody = { name: string }

const route: FastifyPluginCallback = (server: ServerExtended, options, next) => {
  server.get(
    '/price_types',
    { 
      schema: listPriceTypesSchemaSchema,
      // preValidation: [server.authenticate] 
    },
    async (req, res) => {
      req.log.info('list products from db')
      const prices = await getRepository(PriceType).find()
      
      res.send(prices)
    }
  )

  server.post<{ Body: PriceBody }>(
    '/price_types',
    { 
      schema: postItemPricesSchema,
      // preValidation: [server.authenticate] 
    },
    async (req, res) => {
      const { name } = req.body

      if (!name) {
        req.log.info(`name, is required`)
        return res.code(404).send(`name is required`)
      }

      req.log.info(`save price to db`)

      const priceTypeRep = await getRepository(PriceType)
        .save({ name })

      res.code(201).send(priceTypeRep)
    }
  )

  server.patch<{ 
    Body: PriceBody,
    Params: { id: number }
  }>(
    '/price_types/:id',
    { 
      schema: patchItemPricesSchema,
      // preValidation: [server.authenticate] 
    },
    async (req, res) => {
      const { name } = req.body
      const { id } = req.params

      if (!name && !id) {
        req.log.info(`name, item_id is required`)
        return res.code(404).send(`name is required`)
      }

      req.log.info(`save price to db`)

      const priceTypeRep = await getRepository(PriceType)
      const priceType = await priceTypeRep.findOneOrFail({ where: { id: +id } })

      if (priceType){
        const newPriceType = { ...priceType, name }

        await priceTypeRep.save(newPriceType)
        res.code(200).send(newPriceType)
      } else {
        res.code(400).send("{error: 'price type not found'}")
      }
    }
  )

  next()
}

export default route