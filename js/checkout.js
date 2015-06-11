/**
 *  Module
 *
 * Description
 */
angular.module('Checkout', ['starter.service'])
    .controller('CheckoutController', ['$scope', '$localstorage', '$state',
        function($scope, $localstorage, $state) {
            $scope.$on('$ionicView.beforeEnter',
                function() {
                    $scope.carts = JSON.parse($localstorage.get('carts'));
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
