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

    }]).controller('SignupController', [
        '$state',
        '$scope',
        'UserService',
        '$localstorage',
        '$ionicPopup',
        function($state, $scope, userService, $localstorage, $ionicPopup) {
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
                    .getCaptcha(mobile)
                    .success(function(data) {
                        $scope.user.captcha = data;
                    })
                    .error(function(err) {
                        ionicPopup.alert({
                            title: 'error',
                            template: err
                        });
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
