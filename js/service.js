angular.module('starter.service', [])
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return JSON.parse($window.localStorage[key] || defaultValue);
            },
            delete: function(key) {
                return $window.localStorage.removeItem(key);
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key, defaultValue) {
                if (defaultValue.length)
                    return JSON.parse($window.localStorage[key] || "[]");
                else
                    return JSON.parse($window.localStorage[key] || "{}");
            },
            add: function(key, object) {
                var array = $window.localStorage[key],
                    source;
                if (array == null || array == undefined) {
                    source = [];
                } else {
                    source = JSON.parse(array);
                    if (source.some(function(s) {
                            return s.id === object.id;
                        })) {
                        return;
                    }
                }
                source.push(object);
                $window.localStorage[key] = JSON.stringify(source);
            },
            concat: function(key, object) {
                if (!Array.isArray(object)) {
                    console.log("object is not an array");
                    return;
                }
                var array = $window.localStorage[key],
                    source;
                source = array == null ? [] : JSON.parse(array);
                var filteredArray = object.filter(function(o) {
                    return source.indexOf(o) == -1 ? true : false;
                });
                var concated = source.concat(filteredArray);
                $window.localStorage[key] = JSON.stringify(concated);
            }
        }
    }])
    .constant("ajaxConfig", {
        "url": "http://192.168.1.66:3000"
    })
    .service('ProductResource', ['$http', 'ajaxConfig', function($http, ajaxConfig) {
        this.findAll = function(pageable) {
            return $http({
                method: 'GET',
                url: ajaxConfig.url + '/products',
                params: {
                    page: pageable.page,
                    size: pageable.size
                },
                timeout: 6000
            })
        };
        this.findOne = function(id) {
            return $http({
                method: 'GET',
                url: ajaxConfig.url + '/products/' + id
            })
        };
    }])
    .service('UserService', ['$http', 'ajaxConfig', function($http, ajaxConfig) {
        this.login = function(user) {
            return $http.post(ajaxConfig.url + '/user/login', {
                name: user.name,
                password: user.password
            });
        };
        this.signup = function(user) {
            return $http.post(ajaxConfig.url + '/user/signup', {
                name: user.name,
                password: user.password
            });
        };
        this.getCaptcha = function(mobile) {
            return $http.get(ajaxConfig.url + '/user/captcha', {
                mobile: mobile
            });
        };
        this.countByName = function(name) {
            return $http.get(ajaxConfig.url + '/user/_count', {
                name: name
            });
        }

    }])
    .service('AddressService', ['$http', 'ajaxConfig', function($http, ajaxConfig) {
        this.findAll = function(userId) {
            return $http.get(ajaxConfig.url + '/address', {
                id: userId
            });
        };
        this.findAllCities = function() {
            return $http.get(ajaxConfig.url + '/address/cities');
        };
        this.findAllProvinces = function() {
            return $http.get(ajaxConfig.url + '/address/province');
        }
    }]).service('OrderService', ['$http', 'ajaxConfig', '$localstorage', function($http, ajaxConfig, $localstorage) {
        this.findAll = function() {
            return $http.get(ajaxConfig.url + '/orders');
        }
    }]);
