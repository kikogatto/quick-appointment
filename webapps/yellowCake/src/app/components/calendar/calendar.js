'use strict';
/* global angular */

var calendar = angular.module('calendar', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize','auth','commonsCalendar', 'appConfig', 'navigation']);

calendar.config( ['$routeProvider', '$httpProvider', function ( $routeProvider, $httpProvider ) {
    $routeProvider
    .when('/calendar', { templateUrl: 'components/calendar/calendar.html', controller: 'calendarController' });
}]);

calendar.run(['navigationService', function( navigationService) {
    navigationService.addItem( {label:'Agenda', route:'calendar', order:1, icon:'fa-calendar'});
}]);

// ***********************************************************************************************
//  * Controllers
//  ***********************************************************************************************
calendar.controller('calendarController', ['$rootScope', 'authServices',  function ($rootScope, authServices) {
    $rootScope.bodyClass = {'calendar' : true};
}]);