require("dotenv").config();
const mongoose = require("mongoose");
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";
const db = process.env.MONGOURI11;
//This line is temp

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
