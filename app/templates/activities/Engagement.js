'use strict';

angular.module('myApp.Engagement', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Engagement', {
            templateUrl: 'templates/activities/Engagement.html',
            controller: 'Engagement'
        });
    }])

    .controller('Engagement', function ($scope) {
           
    })