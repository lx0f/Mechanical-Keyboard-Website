//Library Imports
const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const express_handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Local Imports
const customerRouter = require("./routes/customer");
const staffRouter = require("./routes/staff");
const loginRouter = require("./routes/login");

//Initialization of the app
const app = express();

//Setup
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "../views"));

app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: "page-layout",
    helpers: {
      equals(arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },

    },
  })
);

app.use("/staff", staffRouter);
app.use("/", loginRouter);
app.use("/", customerRouter);


//Export to app.js
module.exports = app;