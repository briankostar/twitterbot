var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 8080;

//setup view engine
//app.set('views', path.join(__dirname, 'views'));
//set engine to be html using ejs renderfile
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

//set static file directory
//app.use(express.static(path.join(__dirname, 'public')));

//default directory for public files
app.use(express.static('public'));

//middleware to log requests
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

//middleware to catch 404 and log error
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    res.send("404 not found!");
    next(err);
});


var router_main = express.Router();
router_main.route('/')
.get(function(req, res){
    res.render('index.html');
});


app.use('/', router_main);

app.listen(port);
console.log("Magic on " + 8080);
