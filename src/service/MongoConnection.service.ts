import { MongoClient, Collection } from "mongodb";
import * as dotenv from "dotenv";

export default class MongoConnection {
  COLLECTION_NAME: string;
  constructor(COLLECTION_NAME: string) {
    this.COLLECTION_NAME = COLLECTION_NAME;
  }
  async _connectToDB(): Promise<Collection> {
    dotenv.config();
    const client = new MongoClient(process.env.DB_CONN_STRING ?? "");
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const armariosCollectionn = db.collection(this.COLLECTION_NAME ?? "");
    return armariosCollectionn;
  }
}
