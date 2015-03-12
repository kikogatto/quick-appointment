'use strict';
/* global angular, jasmine, describe, it, expect, module, inject, beforeEach, convertDateStringToDateObject, convertAllDateStringProperties */

describe('The utils module', function(){
    var httpProvider;
    beforeEach( module('utils', function($httpProvider) {
        httpProvider = $httpProvider;
    }));

    it('has these requirements', function() {
        var utils = angular.module('utils');
        expect(utils.requires.length).toBe(0);
    });

    it('adds a function to the $httpProvider defaults for the transformResponse', inject( function( ) {
        expect(httpProvider.defaults.transformResponse.length).toBe(2);
    }));

});

describe('The convertDateStringToDateObject', function(){
    beforeEach( module('utils'));

    it('returns false for arguments of type different than String', function() {
        expect( convertDateStringToDateObject ).toBeDefined();
        expect( convertDateStringToDateObject(true) ).toBeFalsy();
        expect( convertDateStringToDateObject(false) ).toBeFalsy();
        expect( convertDateStringToDateObject({}) ).toBeFalsy();
        expect( convertDateStringToDateObject([]) ).toBeFalsy();
        expect( convertDateStringToDateObject(1) ).toBeFalsy();
    });

    it('returns false for string arguments not formatted as expected', function() {
        expect( convertDateStringToDateObject('true') ).toBeFalsy();
        expect( convertDateStringToDateObject('44/44/44') ).toBeFalsy();
        expect( convertDateStringToDateObject('2000-20-10T09:09:09') ).toBeFalsy();
    });
    it('returns a date object for string arguments formatted as expected', function() {
        expect( convertDateStringToDateObject('2015-08-15T09:09:09') ).toBeTruthy();
        expect( convertDateStringToDateObject('2015-08-15T09:09:09.300Z') ).toBeTruthy();
    });
});

describe('The convertAllDateStringProperties', function(){
    beforeEach( module('utils'));

    it('returns the given argument for arguments of type different than Object', function() {
        expect( convertAllDateStringProperties ).toBeDefined();
        expect( convertAllDateStringProperties(true) ).toBe( true);
        expect( convertAllDateStringProperties(false) ).toBe( false);
        var val = 'dfzdff';
        expect( convertAllDateStringProperties(val) ).toBe(val);
        val = [];
        expect( convertAllDateStringProperties(val) ).toBe(val);
        expect( convertAllDateStringProperties(1) ).toBe(1);
    });

    it('returns the given Object with all datestring converted to date Objects', function() {
        var obj = {
            name:'aName',
            birth:'1974-08-15T09:00:00',
            child : {
                name:'aChild',
                birth:'2016-08-15T09:00:00'
            }
        };
        var result = convertAllDateStringProperties(obj);
        expect( result ).toBe(obj);
        expect( result.name ).toEqual('aName');
        expect( result.birth ).toEqual( new Date(1974,7,15,6,0,0) );
        expect( result.child.name ).toEqual('aChild');
        expect( result.child.birth ).toEqual( new Date(2016,7,15,6,0,0) );
    });

    it('returns the given argument for arguments of type Object with no owned properties', function() {
        var val = new Date();
        expect( convertAllDateStringProperties(val) ).toBe(val);
    });

});

describe('The DaysDiff Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns undefined if no date is given', function() {
        var now = new Date();
        var d1;
        expect( now.daysDiff ).toBeDefined();
        expect( now.daysDiff( d1) ).not.toBeDefined();
    });
    it('returns the number of days between this date and the given date', function() {
        var now = new Date();
        var d1 = new Date( now.getTime() + 3 * Date.DAY);
        expect( now.daysDiff( d1) ).toBe(-3);
        d1 = new Date( now.getTime() - 3 * Date.DAY);
        expect( now.daysDiff( d1) ).toBe(3);
        d1 = new Date( now.getTime() - 60 * Date.DAY);
        expect( now.daysDiff( d1) ).toBe(60);
    });

});

describe('The minutesDiff Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns undefined if no date is given', function() {
        var now = new Date();
        var d1;
        expect( now.minutesDiff ).toBeDefined();
        expect( now.minutesDiff( d1) ).not.toBeDefined();
    });
    it('returns the number of minutes between this date and the given date', function() {
        var now = new Date();
        var d1 = new Date( now.getTime() + 3 * Date.HOUR);
        expect( now.minutesDiff( d1) ).toBe(-180);
        d1 = new Date( now.getTime() - 3 * Date.HOUR);
        expect( now.minutesDiff( d1) ).toBe(180);
        d1 = new Date( now.getTime() - 30 * Date.HOUR);
        expect( now.minutesDiff( d1) ).toBe(1800);
    });

});

describe('The plusDays Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns a new Date object with this dates date plus the given number of days', function() {
        var now = new Date();
        expect( now.plusDays ).toBeDefined();

        var d1 = now.plusDays(3);
        expect( now.daysDiff( d1) ).toBe(-3);
        d1 = d1.plusDays(-3);
        expect( now.daysDiff( d1) ).toBe(0);
    });
});

describe('The plusMinutes Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns a new Date object with this dates date plus the given number of minutes', function() {
        var now = new Date();
        expect( now.plusMinutes ).toBeDefined();

        var d1 = now.plusMinutes(3);
        expect( now.minutesDiff( d1) ).toBe(-3);
        d1 = d1.plusMinutes(-3);
        expect( now.minutesDiff( d1) ).toBe(0);
    });
});
describe('The sameDayAt Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns a new Date object with this dates date but at the given time', function() {
        var now = new Date();
        expect( now.sameDayAt ).toBeDefined();

        var d1 = now.sameDayAt(11,10,9,8);
        var d2 = now.sameDayAt(0,0,0,0);
        expect( now.daysDiff( d1) ).toBe(0);
        expect( d1.getTime() - d2.getTime() ).toBe( 11*Date.HOUR + 10*Date.MINUTE + 9000 + 8);
    });
});

describe('The getWeekdayLabel Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns the string representing the name of the weekday for this date', function() {
        var now = new Date(2015, 2, 5);
        expect( now.getWeekdayLabel ).toBeDefined();

        var d1 = now.getWeekdayLabel();
        expect( d1 ).toBe(Date.weekdayLabels[4]);
    });
});

describe('The getMonthLabel Date prototype augmentations', function(){
    beforeEach( module('utils'));

    it('returns the string representing the name of the month for this date', function() {
        var now = new Date(2015, 1, 5);
        expect( now.getMonthLabel ).toBeDefined();

        var d1 = now.getMonthLabel();
        expect( d1 ).toBe(Date.monthNames[1]);
    });
});
