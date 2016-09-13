"use strict";

const { MongoClient: { connect } } = require("mongodb");
const MONGODB_URL = "mongodb://localhost:27017/pugspizza"  //////need to make a new db every project

let db    //////declare db here, then rename it below so it can be reused


module.exports.connect = () => connect(MONGODB_URL).then(mydb => db = mydb)
module.exports.db = () => db
