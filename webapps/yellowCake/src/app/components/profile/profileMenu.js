'use strict';
/* global angular */
var profile = angular.module('profile');

/*
 * Moody Click
 */
profile.directive('profileMenu', ['authServices', function(authServices){
    var directiveDefinitionObject = {
        restrict: 'EA',
        templateUrl:  'components/profile/profileMenu.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {
        }
    };
    return directiveDefinitionObject;
}]);
