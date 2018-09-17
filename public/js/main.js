/* Some Global Variables  */

var refreshIntervalId = 0;
var ALLOW_NOTIFICATIONS_ALERTS = true;

var ENV_VARS = "";

/* Main  */
var app = angular.module('neoCompilerIoWebApp', [
  'ngRoute'
]);

/* Routes */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

    //home page
    .when("/", {templateUrl: "public/templates/smacco.html", controller: "PageCtrl"})

    // else 404
    .otherwise("/404", {templateUrl: "public/templates/404.html", controller: "PageCtrl"});
}]);

/* Controls all other Pages */
app.controller('PageCtrl', function ( $scope, /*$location, */$http) {

});
