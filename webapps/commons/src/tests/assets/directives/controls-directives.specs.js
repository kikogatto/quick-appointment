'use strict';
/* global angular, describe, it, expect, module, inject, beforeEach, spyOn */

describe('The Modal directive', function() {
    var element;
    beforeEach( module('compiledTemplates') );
    beforeEach( module('controls-directives') );

    beforeEach(inject( function ( $compile, $rootScope ) {
        var scope = $rootScope.$new();
        element = $compile('<button type="submit" moody-click="validate()">Teste</button>')( scope );
        scope.$digest();
    }));

    it('does not change the markup', function() {
        expect( $(element).prop('tagName') ).toEqual('BUTTON');
    });

    it('adds a handler to the click event', function() {
        $(element).click();
    });
    it('that does nothing if validates', function() {
        inject( function($rootScope) {
            $rootScope.validate = function() {
                return true;
            };

            $(element).click();
        });

    });

});