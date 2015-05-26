angular.module('Product', ['starter.service'])
    .controller('ProductsController', ['$scope', '$location', '$state', function($scope, $location, $state) {
        $scope.products = [{
            id: '1',
            name: 'product1'
        }, {

            id: '1',
            name: 'product1'
        }, {

            id: '1',
            name: 'product1'
        }, {

            id: '1',
            name: 'product1'
        }, {

            id: '1',
            name: 'product1'
        }];

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
            id: 1,
            name: 'name'
        };

        $scope.addToCart = function(product) {
            $localstorage.pushArray('carts', product);
        };
    }]);
