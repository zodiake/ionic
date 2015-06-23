angular.module('Stop', [])
    .controller('StopsController', [
        '$scope',
        '$ionicPlatform',
        function($scope, $ionicPlatform) {

            $ionicPlatform.ready(function() {
                var success = function(position) {
                    alert(position.coords.latitude);
                };
                var err = function(err) {
                    alert(err.message);
                }
                navigator.geolocation.getCurrentPosition(success, err, {
                    timeout: 20000
                });
            });
        }
    ]);
