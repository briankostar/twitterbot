var Twit = require('twit');

var T = new Twit({
    consumer_key: '7xbdQsO8oZiqTfUJP7HvxCeRe',
    consumer_secret: '94CMYT8Lrs7sUSFwws9tz6fbZkmjfRXkiNmjKh7h8JgI2jy3Gh',
    access_token: '936079862-fnuccdVqcuq8DszperzbVv2TPET8NOd1JesHxOLG',
    access_token_secret: 'Eu9uMAf0IX22gWxQ5CUA86asPBTw35dBZjUglUD25RpUt'
});

function retweetRecent() {
    T.get('search/tweets', {q: "#obama", result_type: "recent"}, function (err, data,response) {
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
