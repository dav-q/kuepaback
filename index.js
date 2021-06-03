var express = require('express');
var http = require('http');
var path = require('path');
var debug = require('debug');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config()
const config = require('./protected/config');

//PUERTO
var port = normalizePort(process.env.PORT ||  8081);

var app = express();

//LISTENING ON SERVER
var server = http.createServer(app);


// Configramos El socket Para notificar el chat
const socketIo= require('socket.io')(server,{
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

// const myMessages = []
socketIo.of('/api/v1/storeMessage').on('connection',function(socket){
  socket.on('send-message',function(data){
    // myMessages.push(data)
    socket.emit('text-event',[data])
    socket.broadcast.emit('text-event',[data])
  })
})

/**
 * Listen on provided port, on all network interfaces.
 */
console.log(port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

app.set('secret', config.secret);

//CORS
app.use((req, res, next) => {
  
  const allowedOrigins = ['http://localhost:4200'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//RUTAS
app.use('/api',require('./routes/api'))
app.use(require('./routes/web'))

module.exports = app;
