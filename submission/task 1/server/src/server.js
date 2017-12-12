//sets up the server
var express = require('express');
var app = express();
require('./routes')(app);
app.listen(3001);
console.log("server running on port 3001...");