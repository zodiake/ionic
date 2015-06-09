angular.module('Tabs', [])
    .controller('TabController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        $rootScope.$on('$ionicView.beforeEnter', function() {

            $rootScope.hideTabs = false;

            switch ($state.current.name) {
                case 'tabs.productDetail':
                case 'tabs.categoriesProductDetail':
                case 'tabs.productDetail':
                case 'tabs.orderDetail':
                case 'tabs.signup':
                    $rootScope.hideTabs = true;
            }
        });
    }]);
