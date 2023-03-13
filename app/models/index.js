import dbConfig from "../config/db.config.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// import testPlant from "./testPlant.model.js";

export default db;