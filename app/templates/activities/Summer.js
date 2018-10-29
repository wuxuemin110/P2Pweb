'use strict';

angular.module('myApp.Summer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Summer', {
            templateUrl: 'templates/activities/Summer.html',
            controller: 'Summer'
        });
    }])

    .controller('Summer', function ($scope) {
           
    })