// written by Seth Wheeler
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('./env.js');

if (!process.env.REDIRECT_URL) {
    throw (new Error("Please set all of the required environment variables."));
    process.exit(1);
}
const proxyApp = express();

proxyApp.set('json spaces', 2);
proxyApp.use(helmet());

proxyApp.use(bodyParser.json());

proxyApp.use(bodyParser.urlencoded({
    extended: true
}));

proxyApp.set('etag', false);

proxyApp.use(require('./Proxy/router.js'));

const ProxyPort = (process.env.PROXY_PORT || 9000);
const DashboardPort = (process.env.DASH_PORT || 9001);

proxyApp.listen(ProxyPort, function(err) {
    if (err) {
        console.error("Error \n" + err);
    } else {
        console.log("Proxy listening on port: " + ProxyPort);
    }
});

const dashboardApp = express();

dashboardApp.set('json spaces', 2);
dashboardApp.use(helmet());

dashboardApp.set('etag', false);

dashboardApp.use(require('./Dashboard/router.js'));

dashboardApp.listen(DashboardPort, function(err) {
    if (err) {
        console.error("Error \n" + err);
    } else {
        console.log("Dashboard listening on port: " + DashboardPort);
    }
});