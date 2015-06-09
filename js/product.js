angular.module('Product', ['starter.service'])
    .controller('ProductsController', [
        '$scope',
        '$state',
        'ProductResource',
        '$ionicPopup',
        '$ionicPlatform',
        function($scope, $state, ProductResource, $ionicPopup, $ionicPlatform) {
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
                        if ($scope.products.length == 0) {
                            $scope.products = data
                        } else {
                            $scope.products = $scope.products.concat(data);
                        }
                        $scope.hasMore = true;
                        $scope.page += 1;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    })
                    .error(function() {
                        netWorkError();
                    });
            };

            $scope.doRefresh = function() {
                console.log($scope.page);
                ProductResource
                    .findAll({
                        page: 1,
                        size: $scope.page * 10
                    })
                    .success(function(data) {
                        $scope.products = data;
                        $scope.hasMore = true;
                        $scope.$broadcast('scroll.refreshComplete');
                    })
                    .error(function() {
                        netWorkError();
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }
        }
    ])
    .controller('ProductDetailController', ['$scope', '$stateParams', '$localstorage', function($scope, $stateParams, $localstorage) {
        $scope.product = {
            id: $stateParams.id,
            name: 'name'
        };

        $scope.addToCart = function(product) {
            $localstorage.pushArray('carts', product);
        };
    }]);
