/* Directives Module */
'use strict';
/* global angular */
var sideMenuModule = angular.module('sideMenu',['auth', 'compiledTemplates']);

sideMenuModule.service('sideMenuService', [ 'authServices', function (authServices) {
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

sideMenuModule.directive('sideMenu', ['$rootScope', 'sideMenuService', 'authServices', function ($rootScope, sideMenuService, authServices) {
    return {
        restrict: 'EA',
        templateUrl:  'assets/directives/sideMenu/side-menu.html',
        replace: true,
        scope: {},
        link: function (scope, iElement, iAttrs) {
            scope.items = sideMenuService.items();
            scope.isVisible = function() {
                return authServices.isAuthenticated() && $rootScope.bodyClass && !$rootScope.bodyClass.fullScreen;
            };
        }
    };
}]);