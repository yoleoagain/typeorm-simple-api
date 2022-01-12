// import Joi from 'joi'

export const itemSchema = {
  id: { type: "number", format: "uuid" },
  name: { type: "string" },
  pictures: {
    type: "array",
    properties: {
      picture_url: {
        type: 'string'
      }
    }
  },
  prices: {
    type: "array",
    properties: {
      price: {
        type: 'number'
      }
    }
  },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" }
}

export const listItemsSchema = {
  summary: "items",
  description: "get items",
  response: {
    200: {
      type: "array",
      items: {
        properties: itemSchema
      }
    }
  }
}

export const postItemSchema = {
  summary: "Create item",
  description: "Post item",
  body: {
    type: "object",
    required: [],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      item_group_id: { type: "number" },
      price_type_id: { type: "number" },
    }
  },
  response: {
    200: {
      type: "object",
      item: {
        properties: itemSchema
      }
    }
  }
}

// export const POST_validationSchema = Joi.object({
//   price: Joi.number()
//     .min(0)
    
// })