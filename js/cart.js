/**
 *  Module
 *
 * Description
 */
angular.module('Cart', []).controller('CartController', ['$scope', 'carts', function($scope, carts) {
    $scope.carts = carts;
}]);