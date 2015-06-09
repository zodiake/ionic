/**
 *  Module
 *
 * Description
 */
angular.module('Cart', ['starter.service'])
    .controller('CartController', ['$scope', '$localstorage',
        function($scope, $localstorage) {
            $scope.$on('$ionicView.beforeEnter',
                function() {
                    $scope.carts = JSON.parse($localstorage.get('carts'));
                }
            );
        }
    ]);
