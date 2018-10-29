'use strict';

angular.module('myApp.InviteFriend', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/InviteFriend', {
            templateUrl: 'templates/activities/InviteFriend.html',
            controller: 'InviteFriend'
        });
    }])

    .controller('InviteFriend', function ($scope) {
           
    })