const docsConfig = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'inventory api',
      description: 'api documentation',
      version: '0.1.0'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'development' },
      {
        url: 'https://<production-url>',
        description: 'production'
      }
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    security: [{ bearerAuth: [] }],
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}

export { docsConfig }