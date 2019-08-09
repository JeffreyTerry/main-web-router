const express = require('express'),
    http = require('http'),
    main = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    vhost = require('vhost');

process.env['NODE_ENV'] = 'production';

var server = http.createServer(main);
global.io = require('socket.io')(server);

main.use(morgan('dev')); /* 'default', 'short', 'tiny', 'dev' */
main.use(bodyParser.json());
main.use(bodyParser.urlencoded());

// NSGOCG web site
try {
  main.use(vhost('*nsgocg.org', require('../nsgocg')));
}
catch(err) {
  console.log('Failed to launch NSGOCG:\n\t' + err.message);
}

// Jeff Terry personal web site
try {
  main.use(vhost('jeffterry.net', require('../jeff-terry-net')));
}
catch(err) {
  console.log('Failed to launch JeffTerry:\n\t' + err.message);
}

// Jeff Terry personal web site
try {
  main.use(vhost('jeffterry.org', require('../jeff-terry-net')));
}
catch(err) {
  console.log('Failed to launch JeffTerry:\n\t' + err.message);
}

// J + J web site
try {
  main.use(vhost('jordanlarsen.plus.jeffterry.org', require('../jj-org')));
}
catch(err) {
  console.log('Failed to launch J + J:\n\t' + err.message);
}

// Jeff Terry personal web site
try {
  main.use(vhost('blog.jeffterry.org', require('../blog-jeff-terry-org')));
}
catch(err) {
  console.log('Failed to launch JeffTerry Blog:\n\t' + err.message);
}

// InvolveU
try {
  main.use(vhost('involveu.jeffterry.org', require('../involveu')));
}
catch(err) {
  console.log('Failed to launch InvolveU:\n\t' + err.message);
}

// SpeedYo
try {
  main.use(vhost('speedyo.jeffterry.org', require('../speedyo')));
}
catch(err) {
  console.log('Failed to launch SpeedYo:\n\t' + err.message);
}

// Vocal Orchard
try {
  main.use(vhost('vocalorchard.jeffterry.org', require('../vocal-orchard-com')));
}
catch(err) {
  console.log('Failed to launch Vocal Orchard:\n\t' + err.message);
}

// The Seed web site
try {
  main.use(vhost('busme.jeffterry.org', require('../busme/server_stuff/server')));
}
catch(err) {
  console.log('Failed to launch BusMe:\n\t' + err.message);
}

// Project XiP web site
try {
  main.use(vhost('projectxip.com', require('../park-ave-xip')));
}
catch(err) {
  console.log('Failed to launch XiP:\n\t' + err.message);
}

// Project XiP blog
try {
  main.use(vhost('blog.projectxip.com', require('../blog-park-ave-xip')));
}
catch(err) {
  console.log('Failed to launch XiP Blog:\n\t' + err.message);
}

// CCEW Vault
try {
  main.use(vhost('*ccew-vault.tk', require('../ccew-vault')));
}
catch(err) {
  console.log('Failed to launch CCEW Vault:\n\t' + err.message);
}

// SpeedYo
try {
  main.use(vhost('54.201.26.7', require('../speedyo')));
}
catch(err) {
  console.log('Failed to launch SpeedYo:\n\t' + err.message);
}

main.set('port', process.env.PORT || 3000);
server.listen(main.get('port'), function () {
    console.log("Express server listening on port " + main.get('port'));
});
