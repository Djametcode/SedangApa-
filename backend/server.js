require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

//import function
const cors = require("cors");
const connectDB = require("./db/connectDB");
const authRoute = require("./route/auth");
const profileRoute = require("./route/profile");
const authMiddleware = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use("/api/v9/sedang-apa/", authRoute);
app.use("/api/v9/sedang-apa/profile", authMiddleware, profileRoute);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server running ...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
