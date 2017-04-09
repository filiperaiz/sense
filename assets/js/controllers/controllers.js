// definido os controllers 

app.controller('homeController', function($scope, $location, UserService) {
    $scope.message = 'tela inicial';


    // NÃO SEI ONDE TU VAI FAZER AS OPERAÇÕES CRUD DO USER... VOU FAZR AQUI NA HOME E TU COLOCA ONDE DEVE SER

    // CRIEI UM SERVICE QUE FAZ AS OPERAÇÕES CRUD


    //CRIANDO UM USUARIO
    var user1 = {
        name: "Adriano",
        email: "adrianootirb@gmail.com"
    }

    var user2 = {
        name: "Felipe",
        email: "felipegay@gmail.com"
    }

    var user3 = {
        name: "Laysa",
        email: "laysa_coracao@gmail.com"
    }

    // INSERIR OS DOIS ELEMENTOS NO LOCALESTORAGE
    UserService.setUser(user1);
    UserService.setUser(user2);
    UserService.setUser(user3);

    console.log("Dados no storage");
    console.log(UserService.getLocalStorageUsers()); // VAI VER OS TRÊS ELEMENTOS NO CONSOLE




    //VOU DELETAR O USUARIO DO LOCAL STORAGE
    console.log("Deletando o usuario 2");
    UserService.removeUser('felipegay@gmail.com');

    console.log(UserService.getLocalStorageUsers()); // O USER FILIPE DELETADO | VAI VER SOMENTE O ADRIANO S2 LAYSA NO CONSOLE


    


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


app.controller('usersController', function($scope) {

    $scope.saved = localStorage.getItem('users');
    $scope.users = (localStorage.getItem('users') !== null) ? JSON.parse($scope.saved) : [];

    $scope.models = [
        { name: 'admin', id: '1' },
        { name: 'root', id: '2' },
        { name: 'write', id: '3' },
        { name: 'read', id: '4' }
    ];


    // adicionar usuario
    $scope.addUser = function(user) {
        $scope.users.push(angular.copy(user));
        delete $scope.user;

        $scope.newuserForm.$setPristine();

        localStorage.setItem('users', JSON.stringify($scope.users));

    };

    // deletar usuario
    $scope.deleteUser = function(users) {
        $scope.users = users.filter(function(user) {
            if (!user.selected) return user;
        });

        localStorage.setItem('users', JSON.stringify($scope.users));
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
