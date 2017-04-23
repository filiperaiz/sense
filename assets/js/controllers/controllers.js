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

app.controller('instanceController', function($scope, $state) {});

app.controller('menuIncludeController', function($scope) {});

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

app.controller('bandejaController', function($scope, $stateParams, $http, load_indicatorsAPI) {

    $scope.situation_maxIndicator = '';
    $scope.toggle = false;
    $scope.favorite = false;



    // Ordenar indicadores nas bandejas
    $scope.orderIndicator = function(field) {
        $scope.orderIndicatorbyAZ = field;
        $scope.orderIndicatorbyZA = !$scope.orderIndicatorbyZA;
    };

    // Carregar json com os indicadores e bandejas
    var carregarIndicadores = function() {
        load_indicatorsAPI.getIndicators().then(function(response) {

            $scope.indicadores = response.data.behaviors;
            $scope.bandejas = response.data.trays;

            $scope.traySituation();

        }, function(err) {
            console.log(err);
        });
    };

    carregarIndicadores();


    $scope.searchId = function(id) {
        for (var i = 0; i < $scope.indicadores.length; i++) {
            var self = $scope.indicadores[i];

            if (self.id == id.toString()) {
                // console.log(self);
                return self
                break;
            }
        }

    }

    $scope.traySituation = function() {
        var val_ = $scope.indicadores[0].value;

        $scope.situation_maxIndicator = $scope.indicadores[0].situation;

        for (var i = 0; i < $scope.indicadores.length; i++) {
            if ($scope.indicadores[i].value > val_) {
                val_ = $scope.indicadores[i].value;
                $scope.situation_maxIndicator = $scope.indicadores[i].situation;
            }
        }
    }



    $scope.favoritos = []

    $scope.pushItems = function pushItems(items) {
        $scope.favoritos.push(angular.copy(items));
    }

    $scope.isFavorite = function(id) {
        var fav = $scope.favoritos;
        for (var i = 0; i < fav.length; i++) {
            if (fav[i].id == id) {
                return true;
            }
        }
        return false;
    }

    $scope.toggleFavorite = function(id) {
        var fav = $scope.favoritos;
        // if already a favorite, uncheck/remove
        if ($scope.isFavorite(id)) {
            for (var i = 0; i < fav.length; i++) {
                if (fav[i].id === id) {
                    fav.splice(i, 1);
                    // unless the item exists more than once, break the loop
                    break;
                }
            }
        }
        // otherwise add the item
        else {
            var newfav = { id: id };
            fav.push(newfav)
        }
    }
});
