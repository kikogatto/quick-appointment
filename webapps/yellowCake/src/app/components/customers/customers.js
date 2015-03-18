'use strict';
/* global angular */

var customers = angular.module('customers', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize','auth', 'appConfig', 'navigation']);

customers.config( ['$routeProvider', '$httpProvider', function ( $routeProvider, $httpProvider ) {
    $routeProvider
    .when('/customers', { templateUrl: 'components/customers/customers.html', controller: 'customersController' });
}]);

customers.run(['navigationService', function( navigationService) {
    navigationService.addItem( {label:'Clientes', route:'customers', order:1, icon:'fa-users'});
}]);

// ***********************************************************************************************
//  * Controllers
//  ***********************************************************************************************
customers.controller('customersController', ['$rootScope', 'authServices',  function ($rootScope, authServices) {
    $rootScope.bodyClass = {'customers' : true};
}]);