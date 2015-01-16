function ChatRoomCtrl($scope) {
	var sock = new SockJS('/chat');
	$scope.messages = [];
    $scope.sendMessage = function() {
	    sock.send($scope.messageText);
	    $scope.messageText = "";
    };

    sock.onmessage = function(e) {
	    $scope.messages.push(e.data);
	    $scope.$apply();
    };
}