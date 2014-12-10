'use strict';
/* global angular */


/************************************************************************************************
 * MODULE: Prontmed Site
 *
 ************************************************************************************************/
var yellowCake = angular.module('yellowCake', [
    'ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize'
]);


yellowCake.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
    .otherwise({redirectTo: '/404'});
}]);

yellowCake.run(['$rootScope', '$location', function($rootScope, $location) {


}]);