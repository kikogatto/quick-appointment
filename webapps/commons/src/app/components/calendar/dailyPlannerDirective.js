'use strict';
/* global angular */

var commonsCalendar = angular.module('commonsCalendar');
commonsCalendar.directive('dailyPlanner', [ 'calendarServices', function (calendarServices) {
    return {
        restrict: 'AE',
        templateUrl: 'components/calendar/partials/dailyPlanner.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {
        }
    };
}]);
