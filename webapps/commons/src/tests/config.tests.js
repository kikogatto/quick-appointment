'use strict';

/************************************************************************************************
 * MODULE: Prontmed Site
 *
 ************************************************************************************************/
var appConfig = angular.module('appConfig', ['ngCookies','ngMock','compiledTemplates']);

appConfig.constant('authConfig', {
    endpoint : 'people'
});

/*
appConfig.run( ['$httpBackend', 'authConfig', function ( $httpBackend, authConfig ) {
    $.cookie('access_token', 'AVeryNiceToken', { expires: 14, path: '/' });
    authBackend($httpBackend, authConfig);
}]);
*/