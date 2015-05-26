angular.module('controller.Tabs', [])
    .controller('TabController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        $rootScope.$on('$ionicView.beforeEnter', function() {

            $rootScope.hideTabs = false;

            if ($state.current.name === 'tabs.productDetail') {
                $rootScope.hideTabs = true;
            }
        });
    }]);
