
'use strict';
/* global angular */

var auth = angular.module('auth', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'compiledTemplates', 'authServices']);
auth.config( ['$routeProvider', '$httpProvider', function ( $routeProvider, $httpProvider ) {
    $routeProvider
    .when('/login', { templateUrl: 'components/auth/login.html', controller: 'LoginController' });
}]);

// ***********************************************************************************************
//  * Controllers
//  ***********************************************************************************************
auth.controller('LoginController', ['$rootScope',  function ($rootScope) {
    $rootScope.bodyClass = {'login' : true};
}]);

/************************************************************************************************
 * Directives
 ************************************************************************************************/
auth.directive('loginForm', [ 'authServices', function (  authServices) {
    return {
        restrict: 'EA',
        templateUrl:  'components/auth/loginForm.html',
        replace: true,
        scope:{},
        link: function (scope, iElement, iAttrs) {
            scope.loginData = {};
            scope.loginButton = {
                label : 'Entrar'
            };
            scope.validate = function() {
                return( scope.loginData.Email && scope.loginData.Email.length > 0 && scope.loginData.Password && scope.loginData.Password.length > 0 );
            };
            scope.login = function() {
                if( !scope.validate() ) {
                    return false;
                }
                scope.error = false;
                scope.loginButton.label='Entrando...';
                var $promise = authServices.login( scope.loginData.Email, scope.loginData.Password );
                $promise.then( function () {
                    scope.loginButton.label = 'Entrar';
                    scope.$emit('Auth.LoggInSuccessful', {});
                }).catch( function(error) {
                    scope.error = true;
                    scope.loginButton.label = 'Entrar';
                    scope.$emit('Auth.LoggInFailed', {});
                });
                return true;
            };
        }
    };
}]);

