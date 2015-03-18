'use strict';
/* global angular */

var commonsCalendar = angular.module('commonsCalendar');
commonsCalendar.directive('monthlyCalendar', [ 'calendarServices', function (calendarServices) {
    return {
        restrict: 'AE',
        templateUrl: 'components/calendar/partials/monthlyCalendar.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {

            var fixDayOfWeekIndex = function (broken) {
                return (broken + (7-calendarServices.getFirstDayOfTheWeek()) ) % 7;
            };

            var resolveWeekdayLabels =  function () {
                var labels = [];
                for( var i = 0; i < 7; i++ ) {
                    labels.push( Date.weekdayLabels[ ( i + calendarServices.getFirstDayOfTheWeek()) % 7 ] );
                }
                return labels;
            };

            var buildMonthlyCalendarFor = function( date ) {
                var today = new Date();
                var month = date.getMonth();
                date = new Date( date.getFullYear(), month, 1,0,0,0,0);
                var dow = fixDayOfWeekIndex( date.getDay() ) ;
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
                    current.isToday = current.daysDiff(today) === 0;

                    days.push( current );
                    current = current.plusDays( 1 );
                }
                // Dias iniciais do mes que vem
                dow = fixDayOfWeekIndex( current.getDay() );
                for( var i2 = days.length; i2 <  42 ; i2++) {
                    days.push ( current );
                    current = current.plusDays( 1 );
                }

                return { date: date, days: days, dateText: date.getMonthLabel() + ' de ' + date.getFullYear() };
            };

            scope.weekDayLabels = resolveWeekdayLabels();

            scope.monthDisplay = buildMonthlyCalendarFor( calendarServices.getSelectedDate() );
        }
    };
}]);
