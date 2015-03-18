'use strict';
/* global angular */


/************************************************************************************************
 * MODULE: Prontmed Site
 *
 ************************************************************************************************/
var yellowCake = angular.module('yellowCake', [
    'ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize',
    'auth',
    'compiledTemplates', 'controls-directives',
    'profile',
    'sideMenu',
    'navigation',
    'customers',
    'calendar',
    'dash'
]);


yellowCake.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
    .when('/404', { templateUrl: '404.html', controller: '404Controller' })
    .otherwise({redirectTo: '/404'});

}]);

yellowCake.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('Auth.LoggInSuccessful', function( e, args) {
		$location.path('/calendar');
	});
}]);

// ***********************************************************************************************
//  * Controllers
//  ***********************************************************************************************
yellowCake.controller('404Controller', ['$rootScope', 'authServices',  function ($rootScope, authServices) {
    $rootScope.bodyClass = {'404' : true, fullScreen : true};
}]);