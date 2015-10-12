var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 4500));

app.set('views', __dirname + 'views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  var name = __dirname + '/views/weatherVR.html';
  res.sendFile(name);
  console.log(name);
});

app.get('/threeJsExample', function(req, res){
  var name = __dirname + '/views/test.html';
  res.sendFile(name);
  console.log(name);
});

app.listen(app.get('port'), function(){
  console.log('app now running on port', app.get('port'));
});