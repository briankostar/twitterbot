var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 8080;
app.use(express.static('public'));

var Twit = require('twit');

var T = new Twit({
    consumer_key: 'NUX6TkMTJJqTaHxv3wcwZ4vhI'
    , consumer_secret: '5dbKLXl9ZIQNegcJR1wIlWeuR3JAIUJObwkW6iO0Fa02tCNfN3'
    , access_token: '604847412-uAon9jrtzsyXWI7wSnJIYix2wA9eiJ3WWM4Hj9a7'
    , access_token_secret: 'zoe8babzRXKfEd5Wxud9dys1dKXB1Ymqw1AlyKLjs79B8'
});

function retweetRecent() {
    T.get('search/tweets', {q: "#twitbot1000", result_type: "recent"}, function (err, data,response) {
	if (!err) {
	    var retweetId = data.statuses[0].id_str;
	    T.post('statuses/retweet/' + retweetId, { }, function (err, response) {
		if (response) {
		    console.log('Retweeted Tweet ID: ' + retweetId);
		    }
		if (err) {
		    console.log('Retweet Error: ', err);
		    }
		});
	    } else {
		console.log('Search Error: ', err);
		}
	});
}

retweetRecent();
setInterval(retweetRecent, 120000);

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
