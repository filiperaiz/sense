angular.module('starter.factorys', [])

.factory('load_indicatorsAPI', function($http) {
    var urlApi = 'http://localhost:9000/db.json';
    // var urlApi = 'http://198.74.59.20:8080/v1/dashboard';
    // var token = 'YWMtJJcbSiXaEeeEPe8Sj4VPGgAAAVuL_MYLmr7G7zafAEErW49wDJgQYFwC2RM';

    // console.log(urlApi + "?accessToken=" + token);

    var _getIndicators = function() {
        // return $http.get(urlApi + "?accessToken=" + token);
        return $http.get(urlApi);
    };

    return {
        getIndicators: _getIndicators
    };
})




