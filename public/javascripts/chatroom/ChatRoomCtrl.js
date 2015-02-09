var ChatRoomCtrl;

ChatRoomCtrl = (function() {
	function ChatRoomCtrl($scope) {
		this.scope = $scope;
		this.sock = new SockJS('/socket');
		$scope.messages = [];

	    this.sock.onmessage = function(e) {
		    $scope.messages.push(e.data);
		    $scope.$apply();
	    };
	}

	ChatRoomCtrl.prototype.sendMessage = function() {
		    this.sock.send(this.scope.messageText);
		    this.scope.messageText = "";
    };

	return ChatRoomCtrl;
})();

controllersModule.controller('ChatRoomCtrl', ChatRoomCtrl);
