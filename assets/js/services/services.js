angular.module('starter.services', [])

.factory('load_indicatorsAPI', function ($http) {
    var urlApi = 'http://198.74.59.20:8080/v1/dashboard';
    var token = 'YWMtmlajCiRtEeeq7rcQhUYOcgAAAVuCp7lVNCnLY8TxgIx4q9vxzlUarQkTIc4';

    console.log(urlApi + "?accessToken=" + token);
    
    var _getIndicators = function () {
        return $http.get(urlApi + "?accessToken=" + token);
    };

    return {
        getIndicators: _getIndicators
    }; 
}) 


.service('UserService', function() {

    var setUser = function(user) {
        var users_storage = this.getLocalStorageUsers();
        users_storage.users.push(user);
        this.setLocalStorageUsers(users_storage);
    };

    var getAllUsers = function() {
        var users_storage = this.getLocalStorageUsers();
        return users_storage;
    };

    var getUser = function(email) {
        var users_storage = this.getLocalStorageUsers();
        var user = {};
        for (var i = 0; i < users_storage.users.length; i++) {
            if (users_storage.users[i].email == email) {
                user = users_storage.users[i];
                break;
            }
        }
        return user;
    };

    var updateUser = function(user) {
        this.removeUser(user.email);
        this.setUser(user);
    };

    var removeUser = function(email) {
        var users_storage = this.getLocalStorageUsers();

        for (var i = 0; i < users_storage.users.length; i++) {
            if (users_storage.users[i].email == email) {
                delete users_storage.users[i];
                break;
            }
        }
        var users_storage2 = { users: [] };
        for (var i = 0; i < users_storage.users.length; i++) {
            if (users_storage.users[i] != null) {
                users_storage2.users.push(users_storage.users[i]);
            }
        }
        this.setLocalStorageUsers(users_storage2);
    };

    var getLocalStorageUsers = function() {
        if (typeof window.localStorage.users_storage === "undefined") {
            return { users: [] }
        } else {
            return JSON.parse(window.localStorage.users_storage)
        }
    }

    var setLocalStorageUsers = function(data) {
        window.localStorage.users_storage = JSON.stringify(data);
    }

    return {
        setUser: setUser,
        getAllUsers: getAllUsers,
        getUser: getUser,
        updateUser: updateUser,
        removeUser: removeUser,
        getLocalStorageUsers: getLocalStorageUsers,
        setLocalStorageUsers: setLocalStorageUsers
    };
})


