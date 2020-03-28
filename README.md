# Capture
###### (using NodeJS)

## Purpose/Goal

If you need to view the data from a response, then you can use this tool

## How to initialize the project

To initialize the project run:

```
$ npm i
```
and copy `.env.sample`, rename it to `.env` and set your environment variables.

The variables `PROXY_PORT` and `DASH_PORT` are both optional and if they are not set the default ports will be used.

## How to run the project

To run the project you can either run with:

```
$ npm start
```

which will expose two ports, one for the proxy and the other for the dashboard.

Upon calling the proxy, the data will be added to the left-hand column on the dashboard for further viewing.

##### Contributions are appreciated
