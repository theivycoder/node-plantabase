import dbConfig from "../config/db.config.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

// Connecting to the database
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

export default db;