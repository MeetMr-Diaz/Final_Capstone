require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;

//static files
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "umkc",
    resave: false,
    saveUninitialized: false,
  })
  );
  
  // Templeting engine
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Routes   
app.use('/', require('./server/routes/allRoutes'))


// app.listen(3000);
app.listen(process.env.PORT || port, () =>   console.log(`Server is running on port ${port}`));
