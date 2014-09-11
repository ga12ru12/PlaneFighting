var plantFightingApp = angular.module('plantFighting', []);

plantFightingApp.controller('plantFightingCtrl', function($location, $scope){
    $scope.columes = Array.apply(null, {length: window.columes}).map(Number.call, Number);
    $scope.rows = Array.apply(null, {length: window.rows})
        .map(function (x,i) { return String.fromCharCode(65 + i) });
});