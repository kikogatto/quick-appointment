/* Directives Module */
'use strict';
/* global angular */
var navigation = angular.module('navigation',['auth', 'compiledTemplates']);

navigation.service('navigationService', [ 'authServices', function (authServices) {
    var _menuItems = [];
    var services = {
        addItem : function(item) {
            _menuItems.push(item);
            var curr = _menuItems.length -1;
            while( curr > 0 && _menuItems[curr-1].order > _menuItems[curr].order) {
                _menuItems[curr] = _menuItems[curr-1];
                _menuItems[curr-1] = item;
                curr--;
            }
        },
        items : function() {
            return _menuItems;
        }
    };
    return services;
}]);

navigation.directive('navigation', ['$rootScope', 'authServices' ,'navigationService', function ($rootScope, authServices, navigationService) {
    return {
        restrict: 'EA',
        templateUrl:  'assets/directives/navigation/navigation.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {
            scope.items = navigationService.items();
            scope.isVisible = function() {
                return authServices.isAuthenticated() && $rootScope.bodyClass && !$rootScope.bodyClass.fullScreen;
            };
        }
    };
}]);