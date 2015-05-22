// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic']).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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
angular.module('starter').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'list.html'
    }).state('category',{
        url:'/category',
        templateUrl:'category.html'
    }).state('mine',{
        url:'/mine',
        templateUrl:'mine.html'
    });
});
angular.module('starter').controller('navigator', ['$scope', '$state', function ($scope, $state) {
    $scope.goCategory = $state.go('category');
}]);
angular.module('starter').controller('toController', ['$scope', '$ionicActionSheet', function ($scope, $ionicActionSheet) {
    $scope.tasks = ['first', 'second', 'third', 'fourth'];
    $scope.items = [
        {
            title: 'first',
            description: 'description'
        },
        {
            title: 'first',
            description: 'description'
        },
        {
            title: 'first',
            description: 'description'
        },
        {
            title: 'first',
            description: 'description'
        },
        {
            title: 'first',
            description: 'description'
        },
    ];
    $scope.show = function (task) {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                {text: '<b>Share</b> This'},
                {text: 'Move'}
            ],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                console.log(task);
                return true;
            }
        });
    };
}]);
