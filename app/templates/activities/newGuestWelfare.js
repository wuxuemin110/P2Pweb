'use strict';

angular.module('myApp.newGuestWelfare', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/newGuestWelfare', {
            templateUrl: 'templates/activities/newGuestWelfare.html',
            controller: 'newGuestWelfare'
        });
    }])

    .controller('newGuestWelfare', function ($scope) {
           
    })