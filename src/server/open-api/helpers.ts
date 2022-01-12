import axios from 'axios'
import fs from 'fs'

export const saveSwaggerSchemaToJSON = async (fileName: string = 'swagger.json') => {
  try{
    const schemaURL = `http://${process.env.HOST}:${process.env.PORT}/docs/json`
    const response = await axios.get(schemaURL)
    await fs.promises.writeFile(fileName, JSON.stringify(response))
  } catch(e){
    console.log(`Could not save Swagger json schema: ${e.message}`)
  }
}


export const generateSwaggerApi = async () => {
  try{
    // await saveSwaggerSchemaToJSON()
    const util = require('util')
    const exec = util.promisify(require('child_process').exec)

    await exec('npx swagger-typescript-api -p ./src/server/open-api/schema.json -o ./src/client/api -n moment-bonus.ts')
    
  } catch(e){
    console.log(`Could not generate swagger API: ${e.message}`)
  }
}