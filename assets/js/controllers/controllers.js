// definido os controllers 

app.controller('homeController', function($scope, $state) {
    $scope.sendModal = function() {
        $('#modal-sign').modal('hide');
        $state.go('login')
    };
});

app.controller('loginController', function($scope, $state) {
    $scope.login = [{
        name: 'sense',
        password: 'sense'
    }];

    $scope.submit = function() {
        if ($scope.login.name == 'sense' && $scope.login.password == 'sense') {
            $state.go('bandeja');
        };

        delete $scope.login;
    };
});

app.controller('instanceController', function($scope, $state, $stateParams) {
});

app.controller('menuIncludeController', function($scope) {
});

app.controller('usersController', function($state, $scope, UserService, $stateParams) {

    if (typeof $stateParams.email === "undefined") {
        $scope.user = {};
    } else {
        $scope.user = UserService.getUser($stateParams.email)
    }

    $scope.users = UserService.getAllUsers().users;

    // adicionar usuario
    $scope.saveUser = function() {
        if (typeof $stateParams.email === "undefined") { // criando
            UserService.setUser($scope.user);
            $('#modal-confirmUser').modal('hide');
            $state.go("users");
        } else { // alterando
            UserService.updateUser($scope.user);
            $('#modal-confirmUser').modal('hide');
            $state.go("users");
        }
    };

    $scope.cancel = function() {
        $state.go("users");
    }

    // deletar usuario
    $scope.deleteUser = function(email) {
        UserService.removeUser(email);
        $scope.users = UserService.getAllUsers().users;
    };

    $scope.csv = function() {
        $state.go("users-csv");
    }

    $scope.savecsv = function() {
        $('#modal-Usercsv').modal('hide');
        $state.go("users");
    }
});

app.controller('bandejaController', function($scope, $http, indicatorsAPI) {

    var carregarIndicadores = function() {
        indicatorsAPI.getIndicators().then(function(response) {
            $scope.indicadores = response.data;
            console.log(response.data);
        }, function(err) {
            console.log(err);
        });
    };

    var carregarIndicadores = function() {
        indicatorsAPI.getIndicators().then(function(response) {
            $scope.indicadores = response.data;
            console.log(response.data);
        }, function(err) {
            console.log(err);
        });
    };



    carregarIndicadores();


    // $scope.bandejas = [
    //     { id: 'bandeja1', name: 'Bandeja 1', type: 'blue' },
    //     { id: 'bandeja2', name: 'Bandeja 2', type: 'red' },
    //     { id: 'bandeja3', name: 'Bandeja 3', type: 'yellow' },
    // ];

    // $scope.indicadores = [
    //     { name: 'A Nome de indicador 1', value: '20', type: 'blue' },
    //     { name: 'B Nome de indicador 2', value: '10', type: 'red' },
    //     { name: 'C Nome de indicador 3', value: '30', type: 'yellow' },
    //     { name: 'D Nome de indicador 4', value: '50', type: 'green' },
    //     { name: 'E Nome de indicador 5', value: '60', type: 'green' },
    //     { name: 'F Nome de indicador 6', value: '40', type: 'blue' },
    // ];
});
