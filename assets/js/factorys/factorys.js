angular.module('starter.factorys', [])

.factory('load_indicatorsAPI', function ($http) {
    var urlApi = 'http://198.74.59.20:8080/v1/dashboard';
    var token = 'YWMtsaGoriVCEeeVyKfYgT_rnQAAAVuIHDywBEQHmpJPMGkPNkEkLJAI1VEg7jM';

    console.log(urlApi + "?accessToken=" + token);
    
    var _getIndicators = function () {
        return $http.get(urlApi + "?accessToken=" + token);
    };

    return {
        getIndicators: _getIndicators
    }; 
}) 