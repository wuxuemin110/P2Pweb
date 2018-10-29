'use strict';

angular.module('myApp.Continuous', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Continuous', {
            templateUrl: 'templates/activities/Continuous.html',
            controller: 'Continuous'
        });
    }])

    .controller('Continuous', function ($scope) {
           
    })