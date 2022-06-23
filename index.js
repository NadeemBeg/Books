require("dotenv").config();  // for .env file
const express = require("express");  // for using api creation 
const app = express();
const bodyParser = require("body-parser"); // for request data get
const cors = require("cors"); // cros platform 
const mongoose = require("mongoose"); // connection for mongodb

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//DB Connection

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(basicAuth);
function basicAuth(req, res, next) {
    var authHearder = req.headers.authorization;
    console.log("authHearder11111", authHearder);
    if (!authHearder) {
        var err = new Error("You are not authenticated!");
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
          return next(err);
    }
    var auth = new Buffer(authHearder.split(' ')[1], 'base64').toString().split(':');
    var userName = auth[0];
    var password = auth[1];
    if (userName === "Book" && password === "Book@123") {
        console.log("YES");
        next();
    }
    else {
        var err = new Error("You are not authenticated!");
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        err.message = "You are not authenticated!"
        return next(err);
    }
}
//My routes
const books = require("./routes/books");            

// //My Routes
app.use("/api", books);

// manage docs
app.use('/books_Image', express.static('./books_Image'));


//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
    console.log(`app is running at`, port);
});