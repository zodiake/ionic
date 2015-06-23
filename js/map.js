angular.module('Map', [])
    .controller('MapController', ['$scope', function($scope) {
        var longitude = 121.506191;
        var latitude = 31.245554;
        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 17,
            markers: []
        };
        (function init() {
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint("上海市万航渡路2170", function(point) {
                if (point) {
                    $scope.mapOptions.markers.push({
                        longitude: point.lng,
                        latitude: point.lat,
                        width: 49,
                        height: 60,
                        title: 'Where',
                        content: 'Put description here'
                    });
                }
            }, "上海市");
        })();

        $scope.getLatitude = function() {
            // 创建地址解析器实例     
        }
    }]);
