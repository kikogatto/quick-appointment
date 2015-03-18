'use strict';
/* global angular, jasmine, describe, it, expect, module, inject, beforeEach */

describe('The dailyPlanner directive', function() {
    var element;
    beforeEach( module('commonsCalendar') );
    beforeEach(inject( function ( $compile, $rootScope ) {
        var scope = $rootScope.$new();
        element = $compile('<daily-planner></daily-planner>')( scope );
        scope.$digest();
    }));

    it('has an isolated scope', inject( function() {
        var scope = element.isolateScope();
        expect( scope ).toBeDefined();
    }));

    it('replaces the element with the appropriate content', function() {
        expect( $(element).prop('tagName') ).toEqual('SECTION');
        expect( $(element).children().length ).toEqual(3);
        expect( $(element).children().eq(0).prop('tagName') ).toEqual('HEADER');
        expect( $(element).children().eq(1).prop('tagName') ).toEqual('DIV');
        expect( $(element).children().eq(2).prop('tagName') ).toEqual('FOOTER');
    });
});