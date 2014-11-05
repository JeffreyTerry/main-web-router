var express = require('express'),
    http = require('http'),
    main = express();

process.env['NODE_ENV'] = 'production';

var server = http.createServer(main);
global.io = require('socket.io')(server);

main.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
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

// Jeff Terry personal web site
try {
  main.use(express.vhost('*jeffterry.org', require('../jeff-terry-net')));
}
catch(err) {
  console.log('Failed to launch JeffTerry:\n\t' + err.message);
}

// Educode web site
try {
  main.use(express.vhost('*educode.org', require('../educode-org')));
}
catch(err) {
  console.log('Failed to launch Educode:\n\t' + err.message);
}

// The Seed web site
try {
  main.use(express.vhost('*theseedok.com', require('../busme/server_stuff/server')));
}
catch(err) {
  console.log('Failed to launch BusMe:\n\t' + err.message);
}

// Park Ave web site
try {
  main.use(express.vhost('projectxip.com', require('../park-ave-xip')));
}
catch(err) {
  console.log('Failed to launch XiP:\n\t' + err.message);
}

// Park Ave blog
try {
  main.use(express.vhost('blog.projectxip.com', require('../blog-park-ave-xip')));
}
catch(err) {
  console.log('Failed to launch XiP Blog:\n\t' + err.message);
}

// SpeedYo
try {
  main.use(express.vhost('54.201.26.7', require('../speedyo')));
}
catch(err) {
  console.log('Failed to launch SpeedYo:\n\t' + err.message);
}

main.set('port', process.env.PORT || 3000);
server.listen(main.get('port'), function () {
    console.log("Express server listening on port " + main.get('port'));
});