'use strict';
/* global angular, describe, it, expect, module, inject, beforeEach, calendarsBackend */

var authSpecs = angular.module('authSpecs', ['ngMock','auth']);

describe('The Auth module', function(){
    beforeEach( module('authSpecs') );

    it('has these requirements', function() {
        var authModule = angular.module('auth');
        expect(authModule.requires.length).toBe(6);
        expect(authModule.requires).toContain('ngRoute');
        expect(authModule.requires).toContain('ngResource');
        expect(authModule.requires).toContain('ngAnimate');
        expect(authModule.requires).toContain('ngSanitize');
        expect(authModule.requires).toContain('compiledTemplates');
        expect(authModule.requires).toContain('authServices');
    });


    describe('configures the login route', function() {
        it(' that uses the LoginController', function() {
            inject( function ( $route, $templateCache ) {
                expect($route.routes['/login'].controller ).toBe('LoginController');
            });
        });

        it(' and renders the template in "components/auth/login.html"', function() {
            inject( function ( $route ) {
                expect($route.routes['/login'].templateUrl).toBe('components/auth/login.html');
            });
        });

        it(' when the browser points to /login', function() {
            inject( function ( $rootScope, $route, $location, $templateCache ) {
                $templateCache.put('components/auth/login.html', '<div></div>');
                $location.path('/login');
                $rootScope.$digest();
                expect($route.current.controller ).toBe($route.routes['/login'].controller);
                expect($route.current.templateUrl ).toBe($route.routes['/login'].templateUrl);
            });
        });
    });

    describe('defines the LoginController', function(){

        beforeEach(inject( function ( $rootScope, $controller, authServices ) {
            expect($controller('LoginController', {$rootScope : $rootScope })).toBeDefined();
            expect( authServices.hasAccessToken() ).toBeFalsy();
        }));

        it(' that sets a bodyClass property on the rootscope to {login:true}', function() {
            inject( function ( $rootScope) {
                expect($rootScope.bodyClass.login).toBe(true);
            });
        });
    });

    describe('Defines the loginForm directive', function() {
        var element;

        beforeEach(inject( function ( $compile, $rootScope ) {
            var scope = $rootScope.$new();
            element = $compile('<login-form></login-form>')( scope );
            scope.$digest();
        }));

        it('that has an isolated scope', inject( function() {
            var scope = element.isolateScope();
            expect( scope ).toBeDefined();
        }));

        it('that replaces the element with the appropriate content', function() {
            expect( $(element).prop('tagName') ).toEqual('FORM');
            expect( $(element).attr('name') ).toEqual('loginForm');
            expect( $(element).attr('novalidate') ).toEqual('');
        });
        it(' that has username and passowrd fields', function() {
            expect( $(element).find('input[type="email"]').length ).toBe(1);
            expect( $(element).find('input[type="password"]').length ).toBe(1);
        });
        it('adds an empty loginData object to the scope', function() {
            var scope = element.isolateScope();
            expect( scope.loginData ).toBeDefined();
        });
        it('adds a loginButton object to the scope, with the label', function() {
            var scope = element.isolateScope();
            expect( scope.loginButton ).toBeDefined();
            expect( scope.loginButton.label ).toEqual('Entrar');
        });
        it('adds a validate method to the scope, that validates the fields', function() {
            var scope = element.isolateScope();
            expect( scope.validate ).toBeDefined();
            expect( scope.validate() ).toBeFalsy();
            scope.loginData.Email='user@teste.com';
            scope.loginData.Password='correctPassword';
            expect( scope.validate() ).toBeTruthy();
        });
        it('adds a login method to the scope, that logs the user with a correct password', function( done ) {
            inject( function ( $rootScope) {
                var scope = element.isolateScope();
                expect( scope.login ).toBeDefined();
                scope.login();
                expect( scope.loginButton.label ).toEqual('Entrar');

                scope.loginData.Email='user@teste.com';
                scope.loginData.Password='correctPassword';
                scope.login();
                expect( scope.loginButton.label ).toEqual('Entrando...');
                $rootScope.$digest();
                expect( scope.loginButton.label ).toEqual('Entrar');
                done();
            });
        });
        it('the login method adds an error to the scope if the credentials are incorrect', function() {
            inject( function ( $rootScope) {
                var scope = element.isolateScope();

                scope.loginData.Email='user@teste.com';
                scope.loginData.Password='incorrectPassword';
                scope.login();
                expect( scope.loginButton.label ).toEqual('Entrando...');
                $rootScope.$digest();
                expect( scope.error ).toBeTruthy();
                expect( scope.loginButton.label ).toEqual('Entrar');
            });
        });

    });
});