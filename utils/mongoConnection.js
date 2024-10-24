require("dotenv").config();
const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
}

connectToMongo();
