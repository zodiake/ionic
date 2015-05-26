// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controller', ['Category', 'Cart', 'Product', 'Order', 'Tabs']);

angular.module('starter', ['ionic', 'starter.controller']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        };
        if (window.StatusBar) {
            StatusBar.styleDefault();
        };
    });
});

angular.module('starter').config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $urlRouterProvider.otherwise("/tabs/products");

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
        }).state('tabs.order', {
            url: '/orders',
            views: {
                'order-tab': {
                    templateUrl: 'templates/orders.html',
                    controller: 'OrderController'
                }
            }
        }).state('tabs.orderDetail', {
            url: '/orders/:id',
            views: {
                'order-tab': {
                    templateUrl: 'templates/orderDetail.html',
                    controller: 'OrderDetailController'
                }
            }
        }).state('tabs.cart', {
            url: '/cart',
            views: {
                'cart-tab': {
                    templateUrl: 'templates/cart.html',
                    controller: 'CartController',
                    resolve: {
                        carts: function($localstorage) {
                            return JSON.parse($localstorage.get('carts'));
                        }
                    }
                }
            }
        }).state('tabs.mine', {
            url: '/mine',
            views: {
                'mine-tab': {
                    templateUrl: 'templates/mine.html',
                }
            }
        }).state('tabs.orders', {
            url: '/mine/orders',
            views: {
                'mine-tab': {
                    templateUrl: 'templates/orders.html'
                }
            }
        }).state('tabs.address', {});
});
