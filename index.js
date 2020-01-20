const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let db = require('./models');
let appRoutes = require('./routes/index');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', appRoutes);

app.listen(4000, function () {
    console.log('listen on 4000')
});

