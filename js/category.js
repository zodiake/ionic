angular.module('Category', [])
    .controller('CategoryController', ['$scope', 'categories', function($scope, categories) {
        $scope.categories = categories;
    }])
    .controller('CategoryProductController', ['$scope', function($scope) {
        $scope.products = [{
            id: 1,
            name: 'product1',
            category: 1
        }, {
            id: 2,
            name: 'product2',
            category: 1
        }, {
            id: 3,
            name: 'product3',
            category: 1
        }, {
            id: 4,
            name: 'product4',
            category: 1
        }, {
            id: 5,
            name: 'product5',
            category: 1
        }];
    }]);
