var express = require('express'),
	http = require('http'),
    main = express();


main.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
main.use(express.json());
main.use(express.urlencoded());

// SoBA Spring 2014 app
try 
{
	main.use(express.vhost('*parking.alihm.net',require ('../soba14-web')));
}
catch (err)
{
	console.log('Failed to launch soba14-web: \n \t' + err.message);
}

// AliHM.net
try
{
	main.use(express.vhost('*alihm.net', require('../alihm')));
}
catch (err)
{
	console.log('Failed to launch alihm app: \n \t' + err.message);
}

// demo.sirenweather.com
try
{
	main.use(express.vhost('*demo.sirenweather.com',require('../siren-demo')));
}
catch (err)
{
	console.log('Failed to launch demo.sirenweather app: \n \t' + err.message);
}

// demo.sirenweather.com
try
{
	main.use(express.vhost('*sirenweather.com',require('../siren-splash')));
}
catch (err)
{
	console.log('Failed to launch sirenweather splash: \n \t' + err.message);
}

main.set('port', process.env.PORT || 8080);
http.createServer(main).listen(main.get('port'), function () {
    console.log("Express server listening on port " + main.get('port'));
});