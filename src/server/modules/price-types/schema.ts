export const priceTypesSchema = {
  id: { type: 'number' },
  name: { type: 'string' },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' }
}

export const listPriceTypesSchemaSchema = {
  summary: 'Price types',
  description: 'Get price types list',
  response: {
    200: {
      type: 'array',
      items: {
        properties: priceTypesSchema
      }
    }
  }
}

const postPatchUnion = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      item: {
        properties: priceTypesSchema
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