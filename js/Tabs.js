angular.module('Tabs', [])
    .controller('TabController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        $rootScope.$on('$ionicView.beforeEnter', function() {

            $rootScope.hideTabs = false;

            if ($state.current.name === 'tabs.productDetail' || $state.current.name === 'tabs.categoriesProductDetail' || $state.current.name === 'tabs.productDetail' || $state.current.name === 'tabs.orderDetail') {
                $rootScope.hideTabs = true;
            }
        });
    }]);
