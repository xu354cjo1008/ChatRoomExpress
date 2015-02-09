var ChatRoom = require('../app/controllers/ChatRoom');

var SockJSRouter;

// room class 
SockJSRouter = (function() {
	function SockJSRouter(server, socket) {
		console.log("SockJSRouter created");

		this.socket = socket;

		this.connections = [];

		sockjsRouterObj = this;

		this.socket.on('connection', function(conn) {

		    var number = sockjsRouterObj.connections.length + 1;
		    sockjsRouterObj.connection(conn, number);

		    conn.on('data', function(message) {
		    	sockjsRouterObj.route(number, message);
		    });
		    conn.on('close', function() {
		    	sockjsRouterObj.close(conn, number);
		    });
		});

		this.socket.installHandlers(server, {prefix:'/socket'});

		//test chatroom function 
		// build a test chatroom
    	this.chatRoom = new ChatRoom('test');

	}

	SockJSRouter.prototype.connection = function(conn, user) {
	    this.connections.push(conn);
	    //join chat room
	    this.chatRoom.join(user, conn);
	};
	SockJSRouter.prototype.route = function(user, message) {
        this.chatRoom.notify(user, message);
	};
	SockJSRouter.prototype.close = function(conn, user) {
        this.chatRoom.quit(user);
	};

	return SockJSRouter;
})();

module.exports = SockJSRouter;