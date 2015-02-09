var Room;
var ChatRoom;
var ChatRoomMgr;

// database
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test3');

var MessageSchema = new mongoose.Schema({
	username: String,
	roomname: String,
	text: String,
	updated_at: { type: Date, default: Date.now },
});
var Message = mongoose.model('Message', MessageSchema);
//room class prototype of chatroom
// Room = (function() {
// 	function Room() {
// 		console.log("Room created");
// 	}
// 	ChatRoom.prototype.join = function() {
// 		console.log("Need to define join function");
// 	};
// 	ChatRoom.prototype.quit = function() {
// 		console.log("Need to define quit function");
// 	};
// 	return Room;
// })();
// chatroom class
ChatRoom = (function() {
	function ChatRoom(roomName) {
		this.name = roomName;
		this.members = [];//new Set(); //unknow ReferenceError: Set is not defined.  ES6 語法？
		console.log("Build a Chat Room!!");
	}
	ChatRoom.prototype.join = function(username, conn) {

		for(var i = 0; i < this.members.length; i++) {
			if (this.members[i].name === username) {
				console.log(username + ' can not join chatroom [' + this.name + ']');
				return 0;
			};
		}
		this.members.push({name: username, conn: conn});

	    conn.write("Welcome, User " + username);

		this.notifyJoin(username);

		console.log(username + ' join chatroom [' + this.name + ']');

        // find all messages from database
	    Message.find({roomname: this.name}, function (err, mes) {
		  if (err) return console.error(err);
		  console.log(mes);
		  for(var i = 0; i < mes.length; i++) {
			  conn.write("User " + mes[i].username + " says: " + mes[i].text);
		  }
		});

		return 1;		
	};
	ChatRoom.prototype.notifyJoin = function(username) {
		for(var i = 0; i < this.members.length - 1; i ++) {
			this.members[i].conn.write(username + ' join to chat!');
		}
	};
	ChatRoom.prototype.notify = function(username, message) {
        for (var i = 0; i < this.members.length; i++) {
            this.members[i].conn.write("User " + username + " says: " + message);
        }
        // save message to database
        Message.create({username: username, roomname: this.name, text: message}, function(err, mes){
		    if(err) console.log(err);
		    else console.log(mes);
		});
	};
	ChatRoom.prototype.quit = function(username) {
		//this.members.delete(username);
        for (var i=0; i < this.members.length; i++) {
            this.members[i].conn.write("User " + username + " has disconnected");
        }
	};
    
	return ChatRoom;
})();

// chatroom manager: manage chat romm
// build room, assign message , manage people.....
ChatRoomMgr = (function() {
	function ChatRoomMgr() {
		this.rooms = [];
	}
	ChatRoomMgr.prototype.build = function(host, roomName, description) {
		var room = new ChatRoom(roomName);
		this.rooms.push(room);
		return room;
	};
	ChatRoomMgr.prototype.join = function(roomName, username, conn) {
		var room = this.rooms.filter(function(item) {return item == roomName});
		if (room.length == 0) {
			var newRoom = this.build(username, roomName, 'test');
			newRoom.join(username, conn);
		} else {
			room.join(username, conn);
		}
	};

	return ChatRoomMgr;
})();

module.exports = ChatRoom;