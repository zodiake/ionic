angular.module('starter.service', []).factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
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
}]);
