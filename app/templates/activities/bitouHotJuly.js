'use strict';

angular.module('myApp.bitouHotJuly', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bitouHotJuly', {
            templateUrl: 'templates/activities/bitouHotJuly.html',
            controller: 'bitouHotJuly'
        });
    }])

    .controller('bitouHotJuly', function ($scope) {
           
    })