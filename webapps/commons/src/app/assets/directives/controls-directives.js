/* Directives Module */
'use strict';
/* global angular */
var controlsDirectives = angular.module('controls-directives',[]);

/*
 * Moody Click
 */
controlsDirectives.directive('moodyClick', ['$parse', function($parse){
    var directiveDefinitionObject = {
        priority: 0,
        replace: false,
        transclude: false,
        restrict: 'A',
        link: function postLink(scope, iElement, iAttrs) {
            var fn = $parse(iAttrs.moodyClick);
            iElement.bind('click', function(event){
                scope.$apply( function(){
                    var ok = fn(scope,{});
                    if(!ok) {
                        var h = $(iElement).css('height');
                        $(iElement).effect('shake', { times:3, distance:20 }, 1000);
                        $(iElement).css('height',h);
                    }
                });
            });
        }
    };
    return directiveDefinitionObject;
}]);
