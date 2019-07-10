const express = require('express');
const app = express();
app.get('/', (req, resp) => {
    resp.send({message: 'Tu primera petición'});
});
app.get('/about', (req, resp) => {
    resp.send({message: 'About page'});
});
app.listen(3000, () => {
    console.log('server on port 3000');
});
