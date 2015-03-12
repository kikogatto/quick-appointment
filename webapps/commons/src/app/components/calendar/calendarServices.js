'use strict';
/* global angular */

var commonsCalendar = angular.module('commonsCalendar', []);

commonsCalendar.service('calendarServices',[ function() {
    var _selectedDay = {
        date: new Date()
    };
    var _firstDayOfTheWeek = 1;
	return {

        fixDayOfWeekIndex: function (broken) {
            return (broken + (7-_firstDayOfTheWeek) ) % 7;
        },

        getWeekdayLabels: function () {
            var labels = [];
            for( var i = 0; i < 7; i++ ) {
                labels.push( Date.weekdayLabels[ ( i + _firstDayOfTheWeek) %7 ] );
            }
            return labels;
        },

        getSelectedDay: function () {
            return _selectedDay.date;
        },

        setSelectedDay: function (date) {
            _selectedDay.date = date;
        },
    };
}]);