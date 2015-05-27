angular.module('starter.service', [])
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            delete: function(key) {
                return $window.removeItem(key);
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            pushArray: function(key, object) {
                var array = $window.localStorage[key],
                    source;
                if (array == null || array == 'undefined') {
                    source = [];
                } else {
                    source = JSON.parse(array);
                    if (source.some(function(s) {
                            return s.id === object.id;
                        })) {
                        console.log('exist');
                        return;
                    }
                }
                source.push(object);
                $window.localStorage[key] = JSON.stringify(source);
            }
        }
    }])
    .constant("ajaxConfig", {
        "url": "http://192.168.1.66:3000",
    })
    .service('ProductResource', ['$http', 'ajaxConfig', function($http, ajaxConfig) {
        this.findAll = function(pageable) {
            return $http({
                method: 'GET',
                url: ajaxConfig.url + '/products',
                params: {
                    page: pageable.page,
                    size: pageable.size
                }
            })
        };
        this.findOne = function(id) {
            return $http({
                method: 'GET',
                url: ajaxConfig.url + '/products/' + id
            })
        };
    }]);