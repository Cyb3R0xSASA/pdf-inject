import { Db, MongoClient, type Document, type WithId } from "mongodb";
import 'dotenv/config'

const mongoClient = async (): Promise<Db> => {
    const mongoUri = process.env.MONGO_URI || "mongodb://sasa@127.0.0.1:27017/";
    const dbName = process.env.DB_NAME;
    const client = new MongoClient(mongoUri);

    await client.connect();
    const db: Db = client.db(dbName);
    return db;
};

const pullData = async (collectionName: string, option: any): Promise<WithId<Document>[]> => {
    const collection = (await mongoClient()).collection(collectionName);
    return collection.find(option).toArray();
};

export default pullData