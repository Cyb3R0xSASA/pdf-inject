import { Db, MongoClient, type WithId, type Document } from "mongodb";
import 'dotenv/config'

const mongoClient = async (): Promise<Db> => {
    const mongoUri = process.env.MONGO_URI || "mongodb://sasa@127.0.0.1:27017/";
    const dbName = process.env.DB_NAME;
    const client = new MongoClient(mongoUri);

    await client.connect();
    const db: Db = client.db(dbName);
    return db;
};

const pullData = async <T extends Document>(collectionName: string, option?: any): Promise<WithId<T>[]> => {
    const collection = (await mongoClient()).collection<T>(collectionName);
    return collection.find(option ?? {}).toArray();
};

export default pullData