'use strict';
/* global angular */
var authAPIModule = angular.module('authAPI', []);

authAPIModule.service('authAPI', [ '$q',  function($q) {
    return {
        login : function(username, password) {
            var defered = $q.defer();
            defered.promise.success = defered.promise.then;
            defered.promise.error = defered.promise.catch;
            if( password.indexOf('incorrect') >=0 ) {
                var error = {
                    status :400,
                    data: {error:'invalid_grant', error_description : 'The user name or password is incorrect.' }
                };
                defered.reject( error);
            } else {
                defered.resolve( {access_token:'ANiceBearerToken'});
            }
            return defered.promise;
        }
    };
}]);
