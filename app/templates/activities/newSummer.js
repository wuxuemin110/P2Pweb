'use strict';

angular.module('myApp.newSummer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newSummer', {
            templateUrl: 'templates/activities/newSummer.html',
            controller: 'newSummer'
        });
    }])

    .controller('newSummer', function ($scope) {
           
    })