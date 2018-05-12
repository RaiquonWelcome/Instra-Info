const logger = require('morgan'); //request logger
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public'; //root directory for our static pages

//Middleware
//use morgan logger to keep request log files
app.use( logger('dev'));
app.use(function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('serving:' + __dirname + ROOT_DIR + req.path);

  next(); //allow next route or middleware to run
});
app.use(express.static(__dirname + ROOT_DIR)); //provide static server

//Routes
app.get('/', (request, response) =>{
  response.sendFile(__dirname + '/html/index.html');
})

app.get('/index.html', (request, response) =>{
  response.sendFile(__dirname + '/html/index.html');
})

app.get('/action', (request, response) =>{
  console.log('INSTRUMENT: ' + request.query['instrument']);
  //TODO connect to Wiki API

})


//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {console.log(`Server listening on port: ${PORT}`)}
})
