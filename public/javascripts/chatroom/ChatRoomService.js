var ChatRoomService;

ChatRoomService = (function() {

	ChatRoomService.headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	ChatRoomService.defaultConfig = {
		headers: ChatRoomService.headers
	};
	
	function ChatRoomService($log, $http, $q) {
	    this.$log = $log;
	    this.$http = $http;
	    this.$q = $q;

        this.$log.debug "constructing ChatRoomService";

		this.sock = new SockJS('/socket');
	}

	ChatRoomService.prototype.sendMessage = function(message) {
		this.$log.debug("sendMessage " + (angular.toJson(message, true)));
	    this.sock.send(message);
    };

	ChatRoomService.prototype.listenMessage = function() {

	    var deferred;

	    this.$log.debug("listenMessages()");

	    deferred = this.$q.defer();

	    this.sock.onmessage = function(e) {
		    deferred.resolve(e.data);
		    return console.log('receive message');
	    };

	    return deferred.promise;
    };

	return ChatRoomService;
})();

servicesModule.service('ChatRoomService', ChatRoomService);