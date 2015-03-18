'use strict';
/* global angular, jasmine, describe, it, expect, module, inject, beforeEach */

describe('The commonsCalendar module', function(){

    it('has these requirements', function() {
        var commonsCalendar = angular.module('commonsCalendar');
        expect(commonsCalendar.requires.length).toBe(1);
        expect(commonsCalendar.requires).toContain('compiledTemplates');
    });


    describe('Describes a calendarServices that', function(){
        beforeEach( module('commonsCalendar') );
        var calendarServices;
        beforeEach( inject( function( _calendarServices_){
            calendarServices = _calendarServices_;

        }));
        it('exists and can be injected', function() {
            expect(calendarServices).toBeDefined();
        });

        it('initializes the selected date with todays date and time', function() {
            expect(calendarServices.getSelectedDate().daysDiff( new Date() )).toBe(0);
            expect(calendarServices.getSelectedDate().minutesDiff( new Date() )).toBe(0);
        });

        it('exposes getter and setter for the selected date', function() {
            var nextWeek = new Date().plusDays(7);
            expect(calendarServices.getSelectedDate()).not.toBe(nextWeek);
            calendarServices.setSelectedDate(nextWeek);
            expect(calendarServices.getSelectedDate()).toBe(nextWeek);
        });

        it('initializes the first day of the week as monday', function() {
            expect(calendarServices.getFirstDayOfTheWeek() ).toBe(1);
        });

        it('exposes getter and setter for the firstDayOfTheWeek', function() {
            expect(calendarServices.getFirstDayOfTheWeek() ).toBe(1);
            calendarServices.setFirstDayOfTheWeek(0);
            expect(calendarServices.getFirstDayOfTheWeek() ).toBe(0);
        });
    });
});

