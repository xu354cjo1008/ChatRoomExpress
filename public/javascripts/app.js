'use strict';

var app, dependencies;

dependencies = ['ngRoute','myApp.services', 'myApp.controllers', 'myApp.common', 'myApp.routeConfig', 'myApp.nav'];

app = angular.module('myApp', dependencies);

// Declare app level module which depends on views, and components
// angular.module('myApp', [
//   'ngRoute',
//   'myApp.nav',
//   'myApp.home',
//   'myApp.about',
//   'myApp.project'
// ]).

angular.module('myApp.routeConfig', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: '/home'
  }).when('/home', {
    templateUrl: '/home'
  }).when('/about', {
    templateUrl: '/about'
  }).when('/project', {
    templateUrl: '/project'
  }).when('/chatroom', {
    templateUrl: '/chatroom'
  }).when('/chat', {
    templateUrl: '/chat'
  }).otherwise({
    redirectTo: '/home'
  });
});

// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/home'});
// }]);

this.commonModule = angular.module('myApp.common', []);

this.controllersModule = angular.module('myApp.controllers', []);

this.servicesModule = angular.module('myApp.services', []);

this.modelsModule = angular.module('myApp.models', []);