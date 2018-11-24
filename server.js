const express = require("express");
const bodyParser = require("body-parser");

//==== import mongodb database configuration====//
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(
    dbConfig.url,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// creates  express append
const app = express();

//parse request of content-type
app.use(bodyParser.urlencoded({ extended: true }));
//parse request of content-type
app.use(bodyParser.json());

//require notes routes
require("./app/routes/note.routes")(app);
// Port variable
port = process.env.PORT || 3000;
//listen for requests
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
