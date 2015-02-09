var chatMessage = {
	username: String,
	roomname: String,
	text: String,
	updated_at: { type: Date, default: Date.now },
}

var room = {
	roomname: String,
	description: String,
	member: user[],
}

var user = {
	id: int,
	name: String,
}