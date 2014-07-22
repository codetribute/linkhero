// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var engine = require('ejs-locals')
var configDB = require('./config/database.js');

var connectionString = configDB.ConStr(app);

// configuration ===============================================================
mongoose.connect(connectionString); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use (express.urlencoded());

    app.engine('ejs', engine);

    app.set('views',__dirname + '/views');
    app.set('view engine', 'ejs');
    app.set('view options', { layout:'layout.ejs' });
	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(express.static(__dirname + '/public'));


    app.use(function(err,req, res, next){

       if(err.status=="404"){
           // respond with html page
           if (req.accepts('html')) {
               res.render('404', { url: req.url });
               return;
           }

           // respond with json
           if (req.accepts('json')) {
               res.send({ error: 'Not found' });
               return;
           }

           // default to plain-text. send()
           res.type('txt').send('Not found');
       }


    });
});



// routes ======================================================================
require('./routes/router.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);



console.log('The magic happens on port ' + port);
