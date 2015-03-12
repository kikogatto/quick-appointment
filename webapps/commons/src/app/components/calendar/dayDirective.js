'use strict';
/* global angular */

var commonsCalendar = angular.module('commonsCalendar');
commonsCalendar.directive('calendarAsDay', [ 'calendarServices', function (calendarServices) {
    return {
        restrict: 'AE',
        templateUrl: 'components/calendar/partials/day.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {
        }
    };
}]);
