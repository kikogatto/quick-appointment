'use strict';
/* global angular */


/************************************************************************************************
 * MODULE: Prontmed Site
 *
 ************************************************************************************************/
var yellowCake = angular.module('yellowCake', [
    'ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize',
    'compiledTemplates', 'controls-directives',
    'sideMenu',
    'calendar',
    'auth'
]);


yellowCake.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
    .otherwise({redirectTo: '/404'});

}]);

yellowCake.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('Auth.LoggInSuccessful', function( e, args) {
		$location.path('/calendar');
	});
}]);