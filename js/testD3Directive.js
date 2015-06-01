/**
 * Created by yagamai on 15-5-29.
 */
angular.module('starter').directive('d3Test', [function () {
    return {
        restrict: 'EA',
        scope: true,
        link: function (scope, element, attrs) {
            d3.select("svg")
                .selectAll("rect")
                .data([15, 50, 22, 8, 100, 10])
                .enter()
                .append("rect")
                .attr("width", 10)
                .attr("height", function (d) {
                    return d;
                });
        }
    }
}]);
