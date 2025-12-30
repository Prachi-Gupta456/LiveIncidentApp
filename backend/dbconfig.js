import { MongoClient } from "mongodb";
import 'dotenv/config'

const url = `${process.env.MONGO_URL}`
const client = new MongoClient(url)

const dbName = "IncidentApp"
export const collectionName = "incidents-list"

export const connection = async()=> {

    await client.connect()

    return client.db(dbName)

}



