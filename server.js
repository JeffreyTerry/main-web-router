var express = require('express'),
    http = require('http'),
    main = express();

process.env['NODE_ENV'] = 'production';

main.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
main.use(express.json());
main.use(express.urlencoded());

// NSGOCG web site
try {
  main.use(express.vhost('*nsgocg.org', require('../nsgocg')));
}
catch(err) {
  console.log('Failed to launch NSGOCG:\n\t' + err.message);
}

// Jeff Terry personal web site
try {
  main.use(express.vhost('*jeffterry.net', require('../jeff-terry-net')));
}
catch(err) {
  console.log('Failed to launch JeffTerry:\n\t' + err.message);
}

// Educode web site
try {
  main.use(express.vhost('*educode.org', require('../educode')));
}
catch(err) {
  console.log('Failed to launch Educode:\n\t' + err.message);
}

main.set('port', process.env.PORT || 3000);
http.createServer(main).listen(main.get('port'), function () {
    console.log("Express server listening on port " + main.get('port'));
});