angular.module('controller.Order', [])
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

    }]);
