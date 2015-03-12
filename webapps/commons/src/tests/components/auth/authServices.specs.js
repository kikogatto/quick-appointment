'use strict';
/* global angular, jasmine, describe, it, expect, module, inject, beforeEach */

describe('The AuthServices module', function(){
    var httpProvider;
    beforeEach( module('authServices', function($httpProvider) {
        httpProvider = $httpProvider;
    }));

    it('has these requirements', function() {
        var authServices = angular.module('authServices');
        expect(authServices.requires.length).toBe(1);
        expect(authServices.requires).toContain('authAPI');
    });

    it('sets the $httpProvider default for the withCredentials to true', inject( function( ) {
        expect(httpProvider.defaults.withCredentials).toBeTruthy();
    }));

    it('adds a transformRequest to the $http defaults', inject( function( authServices ) {
        expect(httpProvider.defaults.transformRequest.length).toBe( 2 );
    }));

});


describe('The AuthServices services', function(){
    beforeEach( module('authServices') );
    var authServices;
    var $rootScope;
    beforeEach( inject( function(_$rootScope_, _authServices_){
        $rootScope = _$rootScope_;
        authServices = _authServices_;
    }));

    describe('exposes the login method', function(){

        it('that given a username and a password, returns a promise to authenticate', function() {
            expect(authServices.login).toBeDefined();
            var promise = authServices.login('user@teste.com', 'correctPassword');
            expect( promise ).toBeDefined();
            expect( promise.success ).toBeDefined();
            expect( promise.error ).toBeDefined();
        });

        it(' the promise returns a TOKEN if authenticated,', function(  done ) {
            var promise = authServices.login('user@teste.com', 'correctPassword');
            var handler = jasmine.createSpy('success');
            promise.success(handler);
            $rootScope.$digest();
            expect(handler).toHaveBeenCalledWith({'access_token':'ANiceBearerToken'});
            done();
        });

        it(' the promise returns a 400 if NOT authenticated,', function(  done ) {
            var promise = authServices.login('user@teste.com', 'incorrectPassword');
            var handler = jasmine.createSpy('error');
            promise.catch( handler );
            $rootScope.$digest();

            var error =  {
                status:400,
                data: {error:'invalid_grant', error_description : 'The user name or password is incorrect.' }
            };
            expect(handler).toHaveBeenCalledWith(error);
            expect( authServices.getAccessToken()).not.toBeDefined();
            expect( authServices.hasAccessToken()).toBeFalsy();
            done();
        });
    });

    describe('exposes the getAccessToken method', function() {
        it('that returns the current access token for te logged user', function(  done ) {
            expect(authServices.getAccessToken).toBeDefined();
            var token = authServices.getAccessToken();
            expect( token ).not.toBeDefined();

            var promise = authServices.login('user@teste.com', 'correctPassword');
            $rootScope.$digest();
            token = authServices.getAccessToken();
            expect( token ).toEqual('ANiceBearerToken');
            done();
        });
    });

    describe('exposes the hasAccessToken method', function() {
        it('that returns  if there is an access token for te logged user', function(  done ) {
            expect(authServices.hasAccessToken).toBeDefined();
            var hasToken = authServices.hasAccessToken();
            expect( hasToken ).toBeTruthy();

            var promise = authServices.login('user@teste.com', 'correctPassword');
            $rootScope.$digest();
            hasToken = authServices.hasAccessToken();
            expect( hasToken ).toBeTruthy();
            done();
        });
    });
    describe('exposes the isAuthenticated method', function() {
        it('that returns true if there is an access token for te logged user', function(  done ) {
            expect(authServices.isAuthenticated).toBeDefined();
            var hasToken = authServices.isAuthenticated();
            expect( hasToken ).toBeTruthy();

            var promise = authServices.login('user@teste.com', 'correctPassword');
            $rootScope.$digest();
            hasToken = authServices.isAuthenticated();
            expect( hasToken ).toBeTruthy();
            done();
        });
    });

    it('exposes the clearAccessToken method', function(  done ) {
        var promise = authServices.login('user@teste.com', 'correctPassword');
        $rootScope.$digest();

        var hasToken = authServices.hasAccessToken();
        expect( hasToken ).toBeTruthy();
        expect(authServices.clearAccessToken).toBeDefined();
        authServices.clearAccessToken();
        hasToken = authServices.hasAccessToken();
        expect( hasToken ).toBeFalsy();
        done();
    });

    describe('transforms all requests', function() {
        var $http;
        var $httpBackend;
        beforeEach( inject( function(_$http_, _$httpBackend_){
            $http = _$http_;
            $httpBackend = _$httpBackend_;
        }));

        it('adds a transformRequest to the htp defaults', function() {
            expect($http.defaults.transformRequest.length).toBe(2);
        });

        it('transforms all requests adding a header authorization: bearer + token if there is one', function(done) {
            $httpBackend.whenGET('headerTest').respond(function( method, url, data, headers) {
                return [200,  headers];
            });
            var headers;
            var headerPromise = $http.get('headerTest');
            headerPromise.success(function(data){
                headers = data;
            });
            $httpBackend.flush();


            expect(headers.Authorization).not.toBeDefined();

            authServices.login('user@teste.com', 'correctPassword');
            $rootScope.$digest();

            headerPromise = $http.get('headerTest');
            headerPromise.success(function(data){
                headers = data;
            });
            $httpBackend.flush();
            expect(headers.Authorization).toEqual('Bearer ANiceBearerToken');

            done();
        });
    });
});
