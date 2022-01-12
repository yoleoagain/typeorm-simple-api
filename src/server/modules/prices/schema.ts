export const itemPriceSchema = {
  id: { type: 'number' },
  price: { type: 'number' },
  price_type_id: { type: 'number' },
  pictures: { type: 'array' },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' }
}

export const listPricesSchema = {
  summary: 'Item prices',
  description: 'Get item prices',
  response: {
    200: {
      type: 'array',
      items: {
        properties: itemPriceSchema
      }
    }
  }
}

const postPatchUnion = {
  body: {
    type: 'object',
    required: ['price_type_id', 'item_id'],
    properties: {
      price_type_id: { type: 'number' },
      price: itemPriceSchema.price,
    }
  },
  response: {
    200: {
      type: 'object',
      item: {
        properties: itemPriceSchema
      }
    }
  }
}

export const postItemPricesSchema = {
  summary: 'Create item price',
  description: 'Post item prices',
  ...postPatchUnion
}

export const patchItemPricesSchema = {
  summary: 'Update item price',
  description: 'Patch item prices',
  ...postPatchUnion
}