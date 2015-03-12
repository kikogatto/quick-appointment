'use strict';
/* global angular */

/************************************************************************************************
 * MODULE: Utils
 *
 ************************************************************************************************/
var dateStringRegexp =/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3}Z)?/;
var convertDateStringToDateObject = function(dateString) {
//var dateStringRegexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
    var match;
    if (typeof dateString !== 'string' || !(match = dateString.match(dateStringRegexp))) {
        return false;
    }
    var milliseconds;
    if (/Z/.test(match[0])) {
        milliseconds = Date.parse(match[0]);
    } else {
        milliseconds = Date.parse(match[0] + '+00:00');
    }

    if (isNaN(milliseconds)) {
        return false;
    }
    return new Date(milliseconds);
};

var convertAllDateStringProperties = function(input) {
    // Ignore things that aren't objects.
    if (typeof input !== 'object') {
        return input;
    }
    for (var key in input) {
        if (!input.hasOwnProperty(key)) {
            continue;
        }

        var value = input[key];
        if (typeof value === 'object') {
            convertAllDateStringProperties( value );
        } else {
            var converted = convertDateStringToDateObject( value );
            if( converted ) {
                input[key] = converted;
            }
        }
    }
    return input;
};

var utils = angular.module('utils', []);

utils.config( ['$httpProvider', function ( $httpProvider ) {
    $httpProvider.defaults.transformResponse.push(convertAllDateStringProperties);
}]);



/*
 * DATE Object customizations
 */
Date.MINUTE =  60 * 1000;
Date.HOUR =  60 * 60 * 1000;
Date.DAY = 24 * 60 * 60 * 1000;

Date.prototype.daysDiff = function(dateToCompare) {
    if (!dateToCompare) {
        return;
    }

    var firstDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var secondDate = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth(), dateToCompare.getDate());


    var timeDiff = (firstDate.getTime() - secondDate.getTime());
    var diffDays = Math.ceil(timeDiff / Date.DAY);
    return diffDays;
};

Date.prototype.minutesDiff = function(dateToCompare) {
    if (!dateToCompare) {
        return;
    }

    var firstDate = this;
    var secondDate = dateToCompare;
    var diffMs = (firstDate.getTime() - secondDate.getTime()); // milliseconds between date and dateToCompare

    //var diffMins = Math.ceil(((diffMs % Date.DAY) % Date.HOUR) / Date.MINUTE); // minutes
    var diffMins = Math.ceil( diffMs / Date.MINUTE ); // minutes
    return diffMins;
};


Date.prototype.plusDays = function(nDays) {
    return new Date( this.getTime() + nDays * Date.DAY );
};

Date.prototype.plusMinutes = function(nMinutes) {
    return new Date( this.getTime() + nMinutes * Date.MINUTE );
};

Date.prototype.sameDayAt = function( hour, minute, second, milisecond ) {
    return new Date( this.getFullYear(), this.getMonth(), this.getDate(), hour, minute, second, milisecond );
};

// Localizations
Date.weekdayLabels = [
    { label: 'Domingo', initials: 'D' },
    { label: 'Segunda-feira', initials: 'S' },
    { label: 'Terça-feira', initials: 'T' },
    { label: 'Quarta-feira', initials: 'Q' },
    { label: 'Quinta-feira', initials: 'Q' },
    { label: 'Sexta-feira', initials: 'S' },
    { label: 'Sábado', initials: 'S' }
];
Date.monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

Date.prototype.getWeekdayLabel= function() {
    return Date.weekdayLabels[ this.getDay() ];
};

Date.prototype.getMonthLabel = function() {
    return Date.monthNames[this.getMonth()];
};
