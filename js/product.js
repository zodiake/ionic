angular.module('Product', ['starter.service'])
    .controller('ProductsController', ['$scope', '$location', '$state', 'ProductResource', function($scope, $location, $state, ProductResource) {
        $scope.products = "";
        ProductResource.findAll({
            page: 1,
            size: 10
        }).success(function(data) {
            $scope.products = data;
        });

        $scope.doRefresh = function() {

        };

        $scope.showDetail = function(product) {
            $state.go('tabs.productDetail', {
                id: product.id
            });
        };
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
