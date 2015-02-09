var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var sockjs = require('sockjs');
var sockjsRouter = require('./routes/SockJSRouter');

// sockjs server
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);

// var connections = [];

// sockjs_echo.on('connection', function(conn) {
//     connections.push(conn);
//     var number = connections.length;
//     conn.write("Welcome, User " + number);
//     conn.on('data', function(message) {
//         for (var ii=0; ii < connections.length; ii++) {
//             connections[ii].write("User " + number + " says: " + message);
//         }
//     });
//     conn.on('close', function() {
//         for (var ii=0; ii < connections.length; ii++) {
//             connections[ii].write("User " + number + " has disconnected");
//         }
//     });
// });

// view engine setup
app.set('port1', process.env.PORT || 9999);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(session({secret: '1234567890QWERTY'}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// http server 
var server = require('http').createServer(app);

var server = server.listen(app.get('port1'), function(){
  console.log('Express server listening on port ' + app.get('port1'));
});
// bind sockjs server to http server
var websocketSouter = new sockjsRouter(server, sockjs_echo);

// sockjs_echo.installHandlers(server, {prefix:'/chat'});


module.exports = app;
