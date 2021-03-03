const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");

//connect database
connectDB();

//Use json
app.use(express.json({ extended: false }));

//routing
app.use("/Projects", require("./routes/api/Project"));
app.use("/Members", require("./routes/api/Members"));
app.use("/Dept", require("./routes/api/Dept"));
app.use("/Subjects", require("./routes/api/Subjects"));
app.use("/admins", require("./routes/api/admins"));
app.use("/auth", require("./routes/api/auth"));

//Serving static assests in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Port where the server has started
const PORT = process.env.PORT || 5000;

//Server port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
