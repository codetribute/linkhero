// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID' 		: '194377530728862', // your App ID
        'clientSecret' 	: 'dc5629f6590647045110e11bb768eb24', // your App Secret
        'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
    },

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '24311832345-poa3t9jfqb1oju77lrc7umc84idhcmmn.apps.googleusercontent.com',
		'clientSecret' 	: '6BL85n_EAItB8-L26cduEBgN',
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
	}

};