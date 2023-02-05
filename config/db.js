const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://reseau:bujumbura@reseau.awqr2xl.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("CONNECTED TO MONGo DB"))
  .catch((err) => console.log("FAILED TO CONNECT TO MONGO DB", err));