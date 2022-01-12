import { listItemsSchema, postItemSchema } from './schema'
import { getRepository } from 'typeorm'
import { 
  Item, 
  Prices 
} from '../../modules/entities'
import { FastifyPluginCallback } from 'fastify'
import { ServerExtended } from '../../types'

type ItemPayload = { 
  name?: string
  description?: string
  price?: number
  item_group_id?: number
  price_type_id?: number
}

const route: FastifyPluginCallback = (server: ServerExtended, options, next) => {
  server.get(
    '/items',
    { 
      schema: listItemsSchema,
      // preValidation: [server.authenticate] 
    },
    async (req, res) => {
      req.log.info('list products from db')

      const items = await getRepository(Item).find({ 
        relations: ['pictures', 'prices']
      })
      res.send(items)
    }
  )

  server.post<{ Body: ItemPayload }>(
    '/items',
    { 
      schema: postItemSchema,
      // preValidation: [server.authenticate] 
    },
    async (req, res) => {
      const { name, description, price, item_group_id, price_type_id } = req.body

      if (!name) {
        req.log.info(`name is required`)
        return res.code(404).send("name is required")
      }

      req.log.info(`save items to db`)

      const itemRep = await getRepository(Item)
      let item = await itemRep.save({
        name,
        description,
        item_group_id: item_group_id || 0,
      })

      if (price && price_type_id){
        const pricesRep = await getRepository(Prices)
        await pricesRep.save({
          price,
          price_type_id,
          item_id: item.id
        })

        item.prices = await pricesRep
          .createQueryBuilder('price')
          .where('price.item_id = :id', { id: item.id })
          .getMany()
      }

      res.code(201).send(item)
    }
  )

  next()
}

export default route