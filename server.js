/**
 * @author: Abu Zayed Kazi
 * Project for SYS366
 * 
 */

var express = require("express");
var app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const multer = require("multer");
const bodyParser = require("body-parser");

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
   console.log("This website is listening on: " + HTTP_PORT);
}

app.engine('.hbs', exphbs({

   extname: '.hbs',

   defaultLayout: 'main',

   helpers: {

      navLink: function (url, options) {
         return '<li' +
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
            '><a href="' + url + '">' + options.fn(this) + '</a></li>';
      },

      equal: function (lvalue, rvalue, options) {
         if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
         if (lvalue != rvalue) {
            return options.inverse(this);
         } else {
            return options.fn(this);
         }
      }
   }
}));

app.set('view engine', '.hbs');

app.use(express.static("public")); //static is a folder that has everything inside it

app.use(bodyParser.urlencoded({ extended: true }));

//defines the storage of the images
const storage = multer.diskStorage({
   destination: "./public/images/uploaded",
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
   }
});

//defining upload variable
const upload = multer({ storage: storage });

// setting up a 'route' to listen on the default url path (http://localhost:8080/)
app.get("/", (req, res) => {
   res.render("index");
});

// setting up another route to listen on /about
app.get("/caseStudy", (req, res) => {
   res.render("caseStudy");
});

app.get("/iteration1", (req, res) => {
   res.render("iteration1");
});

app.get("/iteration2", (req, res) => {
   res.render("iteration2");
});

app.get("/iteration3", (req, res) => {
   res.render("iteration3");
});

app.get("/stakeholder", (req, res) => {
   res.render("stakeholder");
});

app.get("/useCase", (req, res) => {
   res.render("useCase");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);