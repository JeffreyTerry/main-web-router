var express = require('express'),
	http = require('http'),
    main = express();


main.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
main.use(express.json());
main.use(express.urlencoded());

// SoBA Spring 2014 app
try 
{
	var soba = require ('../soba14-web');
	main.use(express.vhost('*.parking.alihm.net',soba));
	main.use(express.vhost('parking.alihm.net',soba));


}
catch (err)
{
	console.log('Failed to launch soba14-web: \n \t' + err.message);
}

// AliHM.net
try
{
	var alihm = require('../alihm');
	main.use(express.vhost('*alihm.net', alihm));
	// main.use(express.vhost('alihm.net',alihm));
}
catch (err)
{
	console.log('Failed to launch alihm app: \n \t' + err.message);
}

// demo.sirenweather.com
try
{
	sirenDemo = require('../siren-demo')
	main.use(express.vhost('*.demo.sirenweather.com',sirenDemo));
	main.use(express.vhost('demo.sirenweather.com',sirenDemo));
}
catch (err)
{
	console.log('Failed to launch demo.sirenweather app: \n \t' + err.message);
}

main.set('port', process.env.PORT || 8080);
http.createServer(main).listen(main.get('port'), function () {
    console.log("Express server listening on port " + main.get('port'));
});