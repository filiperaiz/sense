// definido os controllers 

app.controller('homeController', function($scope, $location) {
    $scope.message = 'tela inicial';

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

    $scope.activeMenu = 'Home';
    // $scope.doTheBack = function() {
    //   window.history.back();
    // };
});
