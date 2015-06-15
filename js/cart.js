/**
 *  Module
 *
 * Description
 */
angular.module('Cart', ['starter.service'])
    .controller('CartController', ['$scope', '$localstorage', '$state',
        function($scope, $localstorage, $state) {
            $scope.$on('$ionicView.beforeEnter',
                function() {
                    $scope.carts = $localstorage.get('carts');
                }
            );
            $scope.checkout = function() {
                $state.go('tabs.checkout');
            }
            $scope.delete = function(cart) {
                $scope.carts.splice($scope.carts.indexOf(cart), 1);
                $localstorage.setObject('carts', $scope.carts);
            }
        }
    ]);
