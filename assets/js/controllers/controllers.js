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

            //$scope.bandejas = response.data.trays;

            $scope.indicadores  = response.data.behaviors;
                
            for(var i=0;i<$scope.indicadores.length;i++){
                $scope.indicadores.favorite = false;
            }

            $scope.bandejas     = $scope.formatJsonTray(response.data.behaviors, response.data.trays);
            
            $scope.traySituation();

        }, function(err) {
            console.log(err);
        });
    };

    carregarIndicadores();

    
    $scope.traySituation = function() {
        var val_ = 0;
        for(var k=0;k<$scope.bandejas.length;k++){
            for(var i=0; i<$scope.bandejas[k].behaviors.length; i++){
                if ($scope.bandejas[k].behaviors[i].value > val_) {
                    val_ = $scope.bandejas[k].behaviors[i].value;
                    $scope.situation_maxIndicator = $scope.bandejas[k].behaviors[i].situation;
                }
            }
        }
    }
    

    $scope.formatJsonTray = function(behaviorsJson, traysJson){
        for(var k=0;k<traysJson.length;k++){
            for(var i=0; i<traysJson[k].behaviors.length; i++){
                id = traysJson[k].behaviors[i].id;

                for(var j= 0; j<behaviorsJson.length; j++){
                    if (id==behaviorsJson[j].id){
                        traysJson[k].behaviors[i] = behaviorsJson[j];
                        break;
                    }
                }
            }
        }
        return traysJson;
    }


    $scope.isFavorite = function(id) {
        for(var i=0; i<$scope.indicadores.length; i++){
            if (id==$scope.indicadores[i].id){
                if($scope.indicadores[i].favorite){
                    $scope.indicadores[i].favorite    = false;    
                }else{
                    $scope.indicadores[i].favorite    = true;
                }                        
            }
        }
        $scope.formatJsonTray($scope.indicadores, $scope.bandejas)
    }

});
