var Twit = require('twit');

var T = new Twit({
    consumer_key: 'NUX6TkMTJJqTaHxv3wcwZ4vhI',
    consumer_secret: '5dbKLXl9ZIQNegcJR1wIlWeuR3JAIUJObwkW6iO0Fa02tCNfN3',
    access_token: '604847412-cphjcKtEq7uhI1TrczOb6yYQPh1DSSdQUK0flizP',
    access_token_secret: '5ktYC5b8IVQgaacrrYHZhyNk5tw06gMH6iGbnEkiWCGj3'
});

function retweetRecent() {
    T.get('search/tweets', {q: "#github", result_type: "recent"}, function (err, data,response) {
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
setInterval(retweetRecent, 180000);
