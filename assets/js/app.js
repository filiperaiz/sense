// definindo o modulo para executar o app
var app = angular.module('myapp', ['ui.router', 'starter.services', 'starter.factorys']);


// Definindo Rotas
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })


    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })


    .state('bandeja', {
        url: '/bandeja',
        templateUrl: 'views/bandeja.html',
        controller: 'bandejaController'
    })


    .state('instance', {
        url: '/instance',
        templateUrl: 'views/instance.html',
        controller: 'instanceController'
    })


    .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'usersController'
    })


    .state('users-csv', {
        url: '/users-csv',
        templateUrl: 'views/users-csv.html',
        controller: 'usersController'
    })


    .state('new-user', {
        url: '/users/user-detail',
        templateUrl: 'views/user-detail.html',
        controller: 'usersController'
    })


    .state('edit-user', {
        url: '/users/edit-user/:email',
        templateUrl: 'views/user-detail.html',
        controller: 'usersController'
    });
});
