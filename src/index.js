const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync(path.join(__dirname, 'sslcert/cert.key'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'sslcert/cert.pem'), 'utf8');

var credentials = {key: privateKey, cert: certificate};

 
const app = express();

// importing routesc
// const adminRoutes = require('./routes/adminRoutes');
const appRoutes = require('./routes/appRoutes');

// settings
app.set('port', process.env.PORT || 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
//app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//   host: '34.90.169.49',
//   user: 'desarrollador',
//   password: 'mariobross5625',
//   port: 3306,
//   database: 'cctv'
// }, 'single'));

app.use(express.urlencoded({ extended: false }));


// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
// app.use('/', cabinetsRoutes);
// app.use('/', devicesRoutes);
app.use('/', appRoutes);



// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(80);

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);


const server = httpsServer.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});