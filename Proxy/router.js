const router = require('express').Router();
const requests = require('../requestHolder.js');

router.all('*', (req, res) => {
    if (process.env.REDIRECT_URL) {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.set('Surrogate-Control', 'no-store');
        res.redirect(301, process.env.REDIRECT_URL);
        requests.unshift({
            request: {
                url: req.url,
                method: req.method,
                headers: req.headers,
                httpVersion: req.httpVersion,
                params: req.params,
                query: req.query,
                body: req.body,
            },
            response: {
                _header: res._header,
                statusCode: res.statusCode,
                _contentLength: res._contentLength,
                statusCode: res.statusCode
            }
        });
    } else {
        throw (new Error("No redirect URL specified as an environment variable!"));
        process.exit(1);
    }
});

module.exports = router;

// Content-Length: 216
// Content-Type: text/html; charset=iso-8859-1
// Date: Sat, 28 Mar 2020 02:40:34 GMT
// Location: https://grouper.apu.edu/grouper/
// Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips
// Strict-Transport-Security: max-age=15768000 max-age=157680000
//
// <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
// <html><head>
// <title>302 Found</title>
// </head><body>
// <h1>Found</h1>
// <p>The document has moved <a href="https://grouper.apu.edu/grouper/">here</a>.</p>
// </body></html>