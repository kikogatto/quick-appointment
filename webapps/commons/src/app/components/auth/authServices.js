'use strict';
/* global angular */
var authServicesModule = angular.module('authServices', ['authAPI']);

authServicesModule.config( [ '$httpProvider', function ( $httpProvider ) {
    $httpProvider.defaults.withCredentials = true;
   // $httpProvider.interceptors.push('authInterceptors');
}]);

authServicesModule.service('authServices', [ '$location','$http', 'authAPI',  function($location,$http, authAPI) {
    var _OAuth = {};

    var authServices = {

        login: function(username, password) {

            var self = this;
            self.clearAccessToken();
            var promise = authAPI.login(username, password);
            promise.then(function(data) {
                $.cookie('access_token', data.access_token, { expires: 14, path: '/' });
                _OAuth.accessToken= data.access_token.replace(/"/g, '');
            });
            promise.catch( function( data ){
                self.clearAccessToken();
            } );
            return promise;

        },

        getAccessToken: function() {
            return _OAuth.accessToken;
        },

        clearAccessToken: function() {
            $.removeCookie('access_token', { path: '/' });
            delete _OAuth.accessToken;
        },

        hasAccessToken: function() {
            return angular.isDefined(_OAuth.accessToken);
        },
        isAuthenticated : function() {
            return this.hasAccessToken();
        }
    };

    if( $.cookie('access_token') ) {
        _OAuth.accessToken = $.cookie('access_token').replace(/"/g, '');
    }

    $http.defaults.transformRequest.push( function(data, headersGetter){
        if ( authServices.hasAccessToken() ) {
            headersGetter().Authorization = 'Bearer ' + authServices.getAccessToken();
        }
        return data;
    } );

    return authServices;
}]);

/*
authServicesModule.service('authInterceptors',['$q', '$location', function($q, $location) {
    var redirectToLoginIfNotAuthorized = function( response ) {
        if (response.status === 401 ) {
            $location.path('/login');
        }
    };

    return {
        'response' : function(response) {
            redirectToLoginIfNotAuthorized(response);
            return response;
        },
        'responseError' : function( response ) {
            redirectToLoginIfNotAuthorized(response);
            return $q.reject(response);
        }
    };
}]);
*/

                    // if (response.status === 401 && response.data.error && response.data.error === 'invalid_token') {
                    //     var deferred = $q.defer(); // defer until we can re-request a new token
                    //     // Get a new token... (cannot inject $http directly as will cause a circular ref)
                    //     $injector.get('$http').jsonp('/some/endpoint/that/reissues/tokens?cb=JSON_CALLBACK').then(function(loginResponse) {
                    //         if (loginResponse.data) {
                    //             $rootScope.oauth = loginResponse.data.oauth; // we have a new oauth token - set at $rootScope
                    //             // now let's retry the original request - transformRequest in .run() below will add the new OAuth token
                    //             $injector.get('$http')(response.config).then(function(response) {
                    //                 // we have a successful response - resolve it using deferred
                    //                 deferred.resolve(response);
                    //             }, function(response) {
                    //                 deferred.reject(); // something went wrong
                    //             });
                    //         } else {
                    //             deferred.reject(); // login.json didn't give us data
                    //         }
                    //     }, function(response) {
                    //         deferred.reject(); // token retry failed, redirect so user can login again
                    //         $location.path('/auth');
                    //         return;
                    //     });
                    //     return deferred.promise; // return the deferred promise
                    // }
                    // return $q.reject(response); // not a recoverable error
