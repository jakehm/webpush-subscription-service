var Twitter = require('twitter')

var client = new Twitter({
  consumer_key: 'aQ6hv1s7wazLnGOs6jy91lkdf',
  consumer_secret: 'wlC1uGflTCehYEIavRJmlh5nxoMeVT3Vwe6ugVNLpq5qtkQVuE',
  access_token_key: '811198401379495940-8CO9RiU3HqrJnqrTkWdFdvM3YsR2l21',
  access_token_secret: 'p8TB80NqknGria9I2AWKSPPDMIqpv9hxBDrdmu2U8gaV0'
})

function convertUsernameToId(screen_name) {
  return client.get('users/show', { screen_name })
  .then(user => {
    const userId = user.id_str
    console.log("Found userid for "+screen_name)
    console.log(userId)
    return userId
	})
  .catch(err => {
    console.error(err)
  })
}

function stream() {
	return 	client.stream('user', {}, function(stream) {
		stream.on('data', function(tweet) {
			console.log(tweet.user.screen_name + ": " + tweet.text)
		})
 
		stream.on('error', function(error) {
			console.log(error)
		})
	})
}

function addUser(screen_name) {
	return client.post('friendships/create', {screen_name})
	.then (data => {
		console.log('successfully added ' + screen_name)
		return data
	})
  .catch(err => {
    console.error(err)
  })
}

function main() {
	console.log('starting stream')
	stream()
	setTimeout(function() {
		console.log('adding user webpushservice')
		addUser('webpushservice')	
	}, 5000);
}

main()