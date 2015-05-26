angular.module('controller.Product', [])
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
    .controller('ProductDetailController', ['$scope', '$stateParams', function($scope, $stateParams) {
        $scope.product = {
            id: 1,
            name: 'name'
        };
        console.log($stateParams.id);
    }]);
