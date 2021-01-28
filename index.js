var express = require('express');
const db = require('./dbConf/db');
var product = require('./routes/product.js');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

// Rest API end points.
app.use('/api/v1/product', product);

// Connect to db and start the application
// With this no of db connection instances can be reduced.
db.connect(() => {
    app.listen(3000);
});

