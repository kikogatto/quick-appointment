'use strict';
/* global angular */

var commonsCalendar = angular.module('commonsCalendar', ['compiledTemplates']);

commonsCalendar.service('calendarServices',[ function() {
    var _data = {
        now: new Date(),
        selected: new Date(),
        firstDayOfTheWeek : 1
    };
	return {

        getSelectedDate: function () {
            return _data.selected;
        },

        setSelectedDate: function (date) {
            _data.selected = date;
        },

        getFirstDayOfTheWeek: function () {
            return _data.firstDayOfTheWeek;
        },

        setFirstDayOfTheWeek: function (firstDayOfTheWeek) {
            _data.firstDayOfTheWeek = firstDayOfTheWeek;
        },
    };
}]);