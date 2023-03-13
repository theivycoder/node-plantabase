import * as dotenv from "dotenv";
dotenv.config();
const dbConfig = {
    url: process.env.MONGODB_URI
};
export default dbConfig;
