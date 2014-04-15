var express = require('express'),
	http = require('http'),
    main = express();

process.env['NODE_ENV'] = 'production';

main.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
main.use(express.json());
main.use(express.urlencoded());

// ParkAVE dev subdomain
// try 
// {
// 	main.get('*dev.getparkave.com', function(req, res){
//   		return res.redirec('dev.getparkave.com:3000/'+req.url)
// 	});
// 	// main.use(express.vhost('*dev.getparkave.com',require ('../soba14-web')));
// }
// catch (err)
// {
// 	console.log('Failed to launch soba14-web: \n \t' + err.message);
// }

// ParkAVE splash page
try 
{
	main.use(express.vhost('*getparkave.com',require ('../parkave-splash')));
}
catch (err)
{
	console.log('Failed to launch parkave splash: \n \t' + err.message);
}

// AliHM.net
// try
// {
// 	main.use(express.vhost('*alihm.net', require('../alihm')));
// }
// catch (err)
// {
// 	console.log('Failed to launch alihm app: \n \t' + err.message);
// }

// // demo.sirenweather.com
// try
// {
// 	main.use(express.vhost('*demo.sirenweather.com',require('../siren-demo')));
// }
// catch (err)
// {
// 	console.log('Failed to launch demo.sirenweather app: \n \t' + err.message);
// }

// Sirenweather.com
try
{
	main.use(express.vhost('*sirenweather.com',require('../Siren-Splash')));
}
catch (err)
{
	console.log('Failed to launch sirenweather splash: \n \t' + err.message);
}

main.set('port', process.env.PORT || 8080);
http.createServer(main).listen(main.get('port'), function () {
    console.log("Express server listening on port " + main.get('port'));
});