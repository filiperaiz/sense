// definido os controllers 

app.controller('homeController', function($scope) {
    $scope.message = 'tela inicial';

    $scope.sendModal = function() {
        $('#modal-sign').modal('hide');
    };
});

app.controller('loginController', function($scope) {
    $scope.message = 'tela de login';
});

app.controller('instanceController', function($scope, $state, $stateParams) {
    
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
});


app.controller('menuIncludeController', function($scope) {
    $scope.message = 'tela de configuracao de instancia';
});
