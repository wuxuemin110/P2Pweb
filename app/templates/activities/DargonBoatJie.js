'use strict';

angular.module('myApp.DargonBoatJie', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/DargonBoatJie', {
            templateUrl: 'templates/activities/DargonBoatJie.html',
            controller: 'DargonBoatJie'
        });
    }])

    .controller('DargonBoatJie', function ($scope) {
           
    })