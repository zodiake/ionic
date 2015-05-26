/**
 *  Module
 *
 * Description
 */
angular.module('Cart', []).controller('CartController', ['$scope', 'carts', function($scope, carts) {
    console.log(carts);
    $scope.carts = carts;
}]);
