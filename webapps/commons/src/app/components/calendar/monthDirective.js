'use strict';
/* global angular */

var commonsCalendar = angular.module('commonsCalendar');
commonsCalendar.directive('calendarAsMonth', [ 'calendarServices', function (calendarServices) {
    return {
        restrict: 'AE',
        templateUrl: 'components/calendar/partials/month.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {
            scope.weekDayLabels = calendarServices.getWeekdayLabels();

            var getDisplayMonth = function( date ) {
                var today = new Date();
                var month = date.getMonth();
                date = new Date( date.getFullYear(), month, 1,0,0,0,0);
                var dow = calendarServices.fixDayOfWeekIndex( date.getDay()) || 7;
                var days =[];
                // Dias finais do mes passado
                for( var i = 0; i <  dow ; i++) {
                    var d = date.plusDays( -1*(i+1) );
                    days.unshift( d );
                }

                // dias deste mes
                var current= date;
                while( current.getMonth() === month ) {
                    current.isCurrent = true;
                    current.isToday = current.toDateString() === today.toDateString();

                    days.push( current );
                    current = current.plusDays( 1 );
                }
                // Dias iniciais do mes que vem
                dow = calendarServices.fixDayOfWeekIndex( current.getDay() );
                for( var i2 = days.length; i2 <  42 ; i2++) {
                    days.push ( current );
                    current = current.plusDays( 1 );
                }

                return { date: date, days: days, dateText: date.getMonthLabel() + ' de ' + date.getFullYear() };
            };

            scope.monthDisplay = getDisplayMonth( new Date() );
        }
    };
}]);
