(function() {
	var nav = angular.module('myApp.nav', []);

	nav.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
      console.log("selected tab is " + newValue);
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });
})();

