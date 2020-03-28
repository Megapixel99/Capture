const router = require('express').Router();
const requests = require('../requestHolder.js');

router.get('/', (req, res) => {
    res.sendFile(__dirname + "/Views/main.html");
});

router.get('/requests', (req, res) => {
    res.json(requests).status(200);
});

router.post('/requests/clear', (req, res) => {
    requests.length = 0;
    res.json(requests).status(200);
});

router.all('*', (req, res) => {
    res.status(404).send('Page not found');
});

module.exports = router;