'use strict';

angular.module('myApp.NewActive', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/NewActive', {
            templateUrl: 'templates/activities/NewActive.html',
            controller: 'NewActive'
        });
    }])

    .controller('NewActive', function ($scope) {
           
    })