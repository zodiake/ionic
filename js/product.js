angular.module('Product', ['starter.service'])
    .controller('ProductsController', ['$scope', '$state', 'ProductResource', '$ionicPopup', function($scope, $state, ProductResource, $ionicPopup) {
        var netWorkError = function() {
            $ionicPopup.alert({
                title: 'alert',
                template: 'net work error'
            });
        };

        $scope.products = [];

        /*----------------init products--------------------*/
        (function() {
            if ($scope.products.length == 0) {

                ProductResource.findAll({
                    page: 1,
                    size: $scope.page * 10
                }).success(function(data) {
                    $scope.products = data;
                }).error(function() {
                    netWorkError();
                });
            }
        }());

        $scope.page = 2;

        $scope.doRefresh = function() {
            ProductResource.findAll({
                page: 1,
                size: $scope.page * 10
            }).success(function(data) {
                $scope.products = data;
            }).error(function() {
                netWorkError();
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.showDetail = function(product) {
            $state.go('tabs.productDetail', {
                id: product.id
            });
        };

        $scope.loadMore = function() {
            ProductResource.findAll({
                page: $scope.page,
                size: 10
            }).success(function(data) {
                $scope.products = $scope.products.concat(data);
                $scope.page = $scope.page + 1;
            }).error(function() {
                netWorkError();
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.moreDataCanBeLoaded = function() {
            return false;
        }
    }])
    .controller('ProductDetailController', ['$scope', '$stateParams', '$localstorage', function($scope, $stateParams, $localstorage) {
        $scope.product = {
            id: $stateParams.id,
            name: 'name'
        };

        $scope.addToCart = function(product) {
            $localstorage.pushArray('carts', product);
        };
    }]);
