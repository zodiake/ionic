// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

angular.module('starter').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "../home.html",
            controller: 'homeController'
        }).state('tabs', {
            abstract: true,
            url: '/tabs',
            templateUrl: "../tabs.html"
        }).state('tabs.products', {
            url: '/products',
            views: {
                'products-tab': {
                    templateUrl: '../products.html',
                    controller: 'productsController'
                }
            }
        }).state('tabs.category', {
            url: '/category',
            views: {
                'category-tab': {
                    templateUrl: '../category.html',
                    controller: 'categoryController'
                }
            }
        });

});

angular.module('starter').controller('homeController', ['$timeout', '$state', function($timeout, $state) {
    $timeout(function() {
        $state.go('tabs.products');
    }, 1000);
}]);

angular.module('starter').controller('productsController', ['$scope', function($scope) {
    $scope.products = [{
        id: '1',
        name: 'product1'
    }, {

        id: '1',
        name: 'product1'
    }, {

        id: '1',
        name: 'product1'
    }, {

        id: '1',
        name: 'product1'
    }, {

        id: '1',
        name: 'product1'
    }];

    $scope.doRefresh = function() {

    }
}]);

angular.module('starter').controller('categoryController', ['$scope', function($scope) {
    $scope.categories = [{
        id: '1',
        name: 'category1'
    }, {
        id: '1',
        name: 'category1'
    }, {
        id: '1',
        name: 'category1'
    }, {
        id: '1',
        name: 'category1'
    }];
}])
