angular.module('Product', ['starter.service'])
    .controller('ProductsController', ['$scope', '$location', '$state', function($scope, $location, $state) {
        $scope.products = [{
            id: '1',
            name: 'product1'
        }, {

            id: '2',
            name: 'product2'
        }, {

            id: '3',
            name: 'product3'
        }, {

            id: '4',
            name: 'product4'
        }, {

            id: '5',
            name: 'product5'
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
            id: $stateParams.id,
            name: 'name'
        };

        $scope.addToCart = function(product) {
            $localstorage.pushArray('carts', product);
        };
    }]);
