// definido os controllers 

app.controller('homeController', function($scope, $location) {
    $scope.message = 'tela inicial';


    // NÃO SEI ONDE TU VAI FAZER AS OPERAÇÕES CRUD DO USER... VOU FAZR AQUI NA HOME E TU COLOCA ONDE DEVE SER

    // CRIEI UM SERVICE QUE FAZ AS OPERAÇÕES CRUD
    $scope.sendModal = function() {
        $('#modal-sign').modal('hide');
    };
});

app.controller('loginController', function($scope) {

    $scope.message = 'tela de login';
});

app.controller('instanceController', function($scope) {
    $scope.message = 'tela de configuracao de instancia';
});


app.controller('usersController', function($state, $scope, UserService, $stateParams) {

    if(typeof $stateParams.email === "undefined"){
        $scope.user = {};
    }else{
        $scope.user = UserService.getUser($stateParams.email)
    }

    $scope.users = UserService.getAllUsers().users;

    // adicionar usuario
    $scope.saveUser = function() {
        if(typeof $stateParams.email === "undefined"){ // criando
            UserService.setUser($scope.user);   
            $state.go("users");
        }else{// alterando
            UserService.updateUser($scope.user);   
            $state.go("users");
        }
    };

    $scope.cancel = function(){
        $state.go("users");
    }

    // deletar usuario
    $scope.deleteUser = function(email) {
        UserService.removeUser(email);
        $scope.users = UserService.getAllUsers().users;
    };


    // $scope.isUserSeleceted = function(users) {
    //     return users.some(function(user) {
    //         return user.selected;
    //     });
    // };

});





app.controller('menuIncludeController', function($scope) {
    $scope.message = 'tela de configuracao de instancia';

    alert("=====")

    $scope.activeMenu = 'Home';
    // $scope.doTheBack = function() {
    //   window.history.back();
    // };
});
