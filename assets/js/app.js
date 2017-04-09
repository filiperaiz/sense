 // definindo o modulo para executar o app
var app = angular .module('myapp', ['ui.router', 'starter.services']);


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
    
    .state('new-user', {
      url: '/users/new-user',
      templateUrl: 'views/new-user.html',
      controller: 'usersController'
    });
    
    // Utilizando o HTML5 History API
    // $locationProvider.html5Mode(true);
});

