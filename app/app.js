'use strict';

// var HOST_URL = "http://192.168.0.112:8084/";
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'myApp.filter',
    'myApp.layout',
    'myApp.index',
    'myApp.investment',
    'myApp.user',
    'myApp.userBankCard',
    'myApp.about',
    'myApp.help',
    'myApp.userRecharge',
    'myApp.userWithdraw',
    'myApp.login',
    'myApp.register',
    'myApp.findPassword',
    'myApp.join',
    'myApp.news',
    'myApp.safeEnsure',
    'myApp.platformMessage',
    'myApp.notices',
    'myApp.InvestmentRecords',
    'myApp.paymentPlans',
    'myApp.fundDetails',
    'myApp.redPackage', 
    'myApp.userInvite',
     'myApp.userSafeCenter',
     'myApp.userOnlineBank',
     'myApp.newGuestWelfare',
     'myApp.InviteFriend',
     'myApp.Engagement',
     'myApp.Continuous',
     'myApp.NewActive',
     'myApp.Newregister',
     'myApp.FirstReturn',
     'myApp.Summer',
     //活动
     'myApp.DargonBoatJie',
     'myApp.newSummer',
     'myApp.bitouHotJuly'


]).config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);