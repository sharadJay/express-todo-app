var express = require("express");
var controller = require('./controller/todoappController')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view-engine','ejs');
app.set("views", "./views");
app.use(express.static('./public'));

//fire controllers
controller(app);

app.listen(8080, function () {
    console.log('Example app listening on port 3000!')
});