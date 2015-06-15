angular.module('mine.Controller', ['starter.service'])
    .controller('MineController', ['$scope', '$state', '$localstorage', function($scope, $state, $localstorage) {
        $scope.logout = function() {
            $localstorage.delete('user');
        };
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
            $scope.address = $localstorage.getObject('address' + $stateParams.id, []);
            $scope.cities = $localstorage.getObject('cities', []);
            $scope.provinces = $localstorage.getObject('provinces', []);
            if ($scope.cities.length == 0) {
                AddressService
                    .findAllCities()
                    .success(function(data) {
                        $scope.cities = data;
                        $localstorage.setObject('cities', data);
                    })
                    .error(function(err) {

                    });
            }
            if ($scope.provinces.length == 0) {
                AddressService
                    .findAllProvinces()
                    .success(function(data) {
                        $scope.provinces = data;
                        $localstorage.setObject('provinces', data);
                    })
                    .error(function(err) {

                    });
            }
        }
    ])
    .controller('OrderController', [
        '$scope',
        'OrderService',
        '$localstorage',
        function($scope, OrderService, $localstorage) {
            function init() {
                OrderService
                    .findAll()
                    .success(function(data) {
                        var orders = [];
                        for (key in data) {
                            orders.push({
                                id: data[key][0].id,
                                total: data[key][0].total
                            });
                        }
                        $scope.orders = orders;
                        $localstorage.setObject('orders', data);
                    })
                    .error(function() {

                    });
            }

            init();

            $scope.doRefresh = function() {
                init();
                $scope.$broadcast('scroll.refreshComplete');
            }
        }
    ]).controller('OrderDetailController', [
        '$scope',
        'OrderService',
        '$stateParams',
        '$localstorage',
        function($scope, OrderService, $stateParams, $localstorage) {
            var orders = $localstorage.getObject('orders', []);
            $scope.orders = orders[$stateParams.id];
        }
    ]).controller('SignupController', [
        '$state',
        '$scope',
        'UserService',
        '$localstorage',
        '$ionicPopup',
        '$q',
        function($state, $scope, userService, $localstorage, $ionicPopup, $q) {
            $scope.user = {};

            $scope.signup = function(form) {
                if (form.$valid) {
                    userService
                        .signup($scope.user)
                        .success(function(data) {
                            console.log(data);
                        })
                        .error(function() {

                        });
                }
            };

            $scope.getCaptcha = function(mobile) {
                userService
                    .countByName(mobile)
                    .success(function(data) {
                        if (data.num == 0)
                            return userService.getCaptcha(mobile);
                        else
                            return $q.reject('exist');
                    }).then(function(data) {}).catch(function(err) {
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
        '$ionicPopup',
        function($scope, UserService, $state, $localstorage, $ionicPopup) {
            $scope.user = {};
            $scope.submitForm = function(loginForm) {
                if (loginForm.$valid) {
                    UserService.login($scope.user).success(function(data) {
                        $state.go('tabs.products');
                        $localstorage.set('user', data.token);
                    }).error(function(err) {
                        $ionicPopup.alert({
                            title: 'fail',
                            template: 'name or password error'
                        });
                    });
                }
            };
            $scope.back = function() {
                $state.go('tabs.mine');
            };
        }
    ]);
