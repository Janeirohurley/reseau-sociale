const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://janeiro:bujumbura@resaux-sociale.woq49su.mongodb.net/reseaux-sociale",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("CONNECTED TO MONGo DB"))
  .catch((err) => console.log("FAILED TO CONNECT TO MONGO DB", err));