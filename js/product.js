angular.module('Product', ['starter.service'])
    .controller('ProductsController', [
        '$scope',
        'ProductResource',
        '$ionicPopup',
        '$ionicPlatform',
        '$localstorage',
        function($scope, ProductResource, $ionicPopup, $ionicPlatform, $localstorage) {
            var netWorkError = function() {
                $ionicPopup.alert({
                    title: 'alert',
                    template: 'net work error'
                });
                $scope.hasMore = false;
            };

            $scope.products = [];
            $scope.hasMore = true;
            $scope.page = 1;

            $scope.loadMore = function() {
                ProductResource
                    .findAll({
                        page: $scope.page,
                        size: 10
                    })
                    .success(function(data) {
                        if (data.length == 0) {
                            $scope.hasMore = false;
                        } else {
                            if ($scope.products.length == 0) {
                                $scope.products = data
                            } else {
                                $scope.products = $scope.products.concat(data);
                            }
                            $scope.hasMore = true;
                            $scope.page += 1;
                            $localstorage.concat('products', data);
                        }
                    })
                    .error(function() {
                        if ($scope.products.length == 0) {
                            var cacheArray = $localstorage.getObject('products', []);
                            $scope.products = cacheArray.length > 0 ? cacheArray : null;
                        }
                        $scope.hasMore = false;
                        netWorkError();
                    }).finally(function() {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            };

            $scope.doRefresh = function() {
                ProductResource
                    .findAll({
                        page: 1,
                        size: $scope.page * 10
                    })
                    .success(function(data) {
                        if (data.length == 0) {
                            $scope.hasMore = false;
                        } else {
                            $scope.products = data;
                            $scope.hasMore = true;
                            $localstorage.setObject('products', data);
                        }
                    })
                    .error(function() {
                        netWorkError();
                        $scope.producs = $localstorage.get('products');
                        $scope.$broadcast('scroll.refreshComplete');
                    }).finally(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }
        }
    ])
    .controller('ProductDetailController', [
        '$scope',
        '$stateParams',
        '$localstorage',
        'ProductResource',
        function($scope, $stateParams, $localstorage, ProductResource) {
            $scope.product = {};
            ProductResource
                .findOne($stateParams.id)
                .success(function(data) {
                    $scope.product = {
                        id: data.id,
                        name: data.name
                    };
                }).error(function() {
                    console.log('net error');
                });
            $scope.addToCart = function(product) {
                $localstorage.add('carts', product);
            };
        }
    ]);
