'use strict';
/* global angular */

var dash = angular.module('dash', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize','auth', 'appConfig', 'navigation']);

dash.config( ['$routeProvider', '$httpProvider', function ( $routeProvider, $httpProvider ) {
    $routeProvider
    .when('/dash', { templateUrl: 'components/dash/dash.html', controller: 'dashController' });
}]);

dash.run(['navigationService', function( navigationService) {
    navigationService.addItem( {label:'Painel', route:'dash', order:0, icon:'fa-tachometer'});
}]);

// ***********************************************************************************************
//  * Controllers
//  ***********************************************************************************************
dash.controller('dashController', ['$rootScope', 'authServices',  function ($rootScope, authServices) {
    $rootScope.bodyClass = {'dash' : true};
}]);