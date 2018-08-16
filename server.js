const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(request, response) {
    response.sendFile('index.html');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))