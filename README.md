Run `forever server.js` here to start all of my node sites.

Server.js uses Express with vhost to redirect server requests to the appropriate web applications.

My ec2 server is set up so that each of the node sites runs through `server.js`. In contrast, the Django sites each use Apache's built-in VirtualHost functionality.

The main Apache conf file can be found in this repository under `file-backups/mainserver.sites.conf`. It should be copied to `/etc/apache2/sites-enabled/mainserver.sites.conf` and Apache's other conf files should be configured to include this file (i.e. make sure the line `IncludeOptional sites-enabled/*.conf` is present in `/etc/apache2/apache2.conf`).

Since I don't want to push credentials or secret keys to GitHub, I've put all of that stuff in `~/config-files` (starting with surfy). To set up a new server, simply copy these files from the old one to the new one. If the server has crashed and you've lost these files, just recreate them according to the corresponding READMEs for each project. As of August 14, 2019, `config-files` contains two folders, `surfy-prod` and `surfy-staging`. Each contains two files which must be copied over to `surfy` and `surfy-staging`, respectively: `wsgi.py` and `build-react-frontend.sh`. If I get a server with more RAM in the future, I'll be able to remove `build-react-frontend.sh` from the config-files (right now, the prod version is different from the dev version because I can't run `npm run build` with < 1GB of ram.

  




