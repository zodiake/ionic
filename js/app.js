// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controller', ['Stop', 'Map', 'Category', 'Cart', 'Product', 'Tabs', 'mine.Controller', 'Checkout']);

angular.module('starter', ['baiduMap', 'ionic', 'starter.controller', 'starter.service', 'ngCordova', 'angular-jwt'])
    .run(['$ionicPlatform',
        '$rootScope',
        '$state',
        function($ionicPlatform, $rootScope, $state) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                    if (error.unAuthorized) {
                        $state.go('login');
                    }
                });
            });
        }
    ]);

angular.module('starter').config(['$ionicConfigProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    'jwtInterceptorProvider',
    function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $urlRouterProvider.otherwise("/tabs/products");

        jwtInterceptorProvider.tokenGetter = [function() {
            return window.localStorage['user']
        }];
        $httpProvider.interceptors.push('jwtInterceptor');

        var loginResolve = {
            user: ['$q', '$window', function($q, $window) {
                if ($window.localStorage['user'] == null) {
                    return $q.reject({
                        unAuthorized: true
                    });
                }
            }]
        };

        $stateProvider
            .state('tabs', {
                abstract: true,
                url: '/tabs',
                templateUrl: "templates/tabs.html",
                controller: 'TabController'
            }).state('tabs.categories', {
                url: '/categories',
                views: {
                    'category-tab': {
                        templateUrl: 'templates/category.html',
                        controller: 'CategoryController'
                    }
                }
            }).state('tabs.categoriesProducts', {
                url: '/:categoryId/products',
                views: {
                    'category-tab': {
                        templateUrl: 'templates/categoryProduct.html',
                        controller: 'CategoryProductController'
                    }
                }
            }).state('tabs.categoriesProductDetail', {
                url: '/:categoryId/products/:id',
                views: {
                    'category-tab': {
                        templateUrl: 'templates/productDetail.html',
                        controller: 'ProductDetailController'
                    }
                }
            }).state('tabs.products', {
                url: '/products',
                views: {
                    'products-tab': {
                        templateUrl: 'templates/products.html',
                        controller: 'ProductsController'
                    }
                }
            }).state('tabs.productDetail', {
                url: '/products/:id',
                views: {
                    'products-tab': {
                        templateUrl: 'templates/productDetail.html',
                        controller: 'ProductDetailController'
                    }
                }
            }).state('tabs.stops', {
                url: '/stops',
                views: {
                    'stops-tab': {
                        templateUrl: 'templates/stops.html',
                        controller: 'StopsController'
                    }
                }
            }).state('tabs.cart', {
                url: '/cart',
                views: {
                    'cart-tab': {
                        templateUrl: 'templates/cart.html',
                        controller: 'CartController'
                    }
                }
            }).state('tabs.checkout', {
                url: '/checkout',
                views: {
                    'cart-tab': {
                        templateUrl: 'templates/checkout.html',
                        controller: 'CheckoutController'
                    }
                }
            }).state('tabs.mine', {
                url: '/mine',
                views: {
                    'mine-tab': {
                        templateUrl: 'templates/mine.html',
                        controller: 'MineController'
                    }
                }
            }).state('tabs.orders', {
                url: '/mine/orders',
                views: {
                    'mine-tab': {
                        templateUrl: 'templates/orders.html',
                        controller: 'OrderController',
                        resolve: loginResolve
                    }
                }
            }).state('tabs.orderDetail', {
                url: '/orders/:id',
                views: {
                    'mine-tab': {
                        templateUrl: 'templates/orderDetail.html',
                        controller: 'OrderDetailController'
                    }
                }
            }).state('tabs.address', {
                url: '/mine/address',
                views: {
                    'mine-tab': {
                        templateUrl: 'templates/address.html',
                        controller: 'AddressController',
                        resolve: loginResolve
                    }
                }
            }).state('tabs.addressDetail', {
                url: '/address/:id',
                views: {
                    'mine-tab': {
                        templateUrl: 'templates/addressDetail.html',
                        controller: 'AddressDetailController',
                        resolve: loginResolve
                    }
                }
            }).state('tabs.changePassword', {
                url: '/mine/changePassword',
                views: {
                    'mine-tab': {
                        templateUrl: 'templates/changePassword.html',
                        controller: 'ChangePasswordController',
                        resolve: loginResolve
                    }
                }
            }).state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            }).state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'SignupController'
            }).state('map', {
                url: '/map',
                templateUrl: 'templates/maps.html',
                controller: 'MapController'
            });
    }
]);
