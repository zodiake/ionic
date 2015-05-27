angular.module('mine.Controller', [])
    .controller('LoginController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        $scope.login = function() {
            $state.go($rootScope.xToLoginState);
        };
        $scope.back = function() {
            $state.go($rootScope.xToLoginState);
        }
    }])
    .controller('AddressController', ['$scope', function($scope, $ionicPopover) {

    }]);
