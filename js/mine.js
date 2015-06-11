angular.module('mine.Controller', ['starter.service'])
    .controller('MineController', ['$scope', '$state', '$localstorage', function($scope, $state, $localstorage) {
        $scope.logout = function() {
            $localstorage.delete('user');
        };
    }])
    .controller('LoginController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        $scope.login = function() {
            $state.go($rootScope.xToLoginState);
        };
        $scope.back = function() {
            $state.go($rootScope.xToLoginState);
        }
    }])
    .controller('AddressController', [
        '$scope',
        'AddressService',
        '$localstorage',
        function($scope, AddressService, $localstorage) {
            if ($scope.addresses == undefined) {
                AddressService.findAll(1).success(function(data) {
                    $scope.addresses = data;
                    $scope.addresses.forEach(function(item) {
                        $localstorage.setObject('address' + item.id, item);
                    });
                }).error(function(err) {

                });
            }
        }
    ])
    .controller('AddressDetailController', [
        '$scope',
        'AddressService',
        '$stateParams',
        '$localstorage',
        function($scope, AddressService, $stateParams, $localstorage) {
            $scope.address = $localstorage.getObject('address' + $stateParams.id);
            if ($scope.cities == undefined) {
                AddressService
                    .findAllCities()
                    .success(function(data) {
                        $scope.cities = data;
                    })
                    .error(function(err) {

                    });
            }
            if ($scope.province == undefined) {
                AddressService
                    .findAllProvinces()
                    .success(function(data) {
                        $scope.provinces = data;
                    })
                    .error(function(err) {

                    });
            }

        }
    ])
    .controller('OrderController', ['$scope', function($scope) {
        $scope.orders = [{
            id: 1,
            name: 'order1'
        }, {
            id: 2,
            name: 'order2'
        }, {
            id: 3,
            name: 'order3'
        }, {
            id: 4,
            name: 'order4'
        }, {
            id: 5,
            name: 'order5'
        }];
    }])
    .controller('OrderDetailController', ['$scope', function($scope) {

    }]).controller('SignupController', ['$state', '$scope', 'UserService', '$localstorage',
        function($state, $scope, userService, $localstorage) {
            $scope.signup = function(user) {
                userService
                    .signup(user)
                    .success(function(data) {
                        $localstorage.set('user', data);
                    }).error(function(err) {
                        alert(err);
                    });
            };
        }
    ])
    .controller('ChangePasswordController', ['$scope', function($scope) {

    }])
    .controller('LoginController', [
        '$scope',
        'UserService',
        '$state',
        '$localstorage',
        function($scope, UserService, $state, $localstorage) {
            $scope.user = {};
            $scope.hideBackButton = false;
            $scope.login = function() {
                UserService.login($scope.user).success(function(data) {
                    $localstorage.set('user', 'data');
                    $state.go('tabs.products', {}, {
                        reload: true
                    });
                }).error(function(error) {
                    alert(error);
                });
            };
            $scope.back = function() {
                $state.go('tabs.mine');
            }
        }
    ]);
