var ChatRoomCtrl;

ChatRoomCtrl = (function() {
    function ChatRoomCtrl($scope) {
        this.scope = $scope;
        this.sock = new SockJS('/socket');
        $scope.messages = [];

        this.sock.onmessage = function(e) {
            $scope.messages.push(e.data);
            $scope.$apply();
            document.getElementById('canvas').scrollTop = document.getElementById('canvas').scrollHeight;
            //window.scrollTo(0,document.body.scrollHeight);
        };
    }

    ChatRoomCtrl.prototype.sendMessage = function() {
        var userMessage = JSON.stringify({ "name": this.scope.name, "messageText": this.scope.messageText});
        this.sock.send(userMessage);
        this.scope.messageText = "";
    };

    return ChatRoomCtrl;
})();

controllersModule.controller('ChatRoomCtrl', ChatRoomCtrl);
