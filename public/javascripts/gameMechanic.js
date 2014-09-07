var plantFightingApp = angular.module('plantFighting', []);

plantFightingApp.controller('plantFightingCtrl', function($scope){
    $scope.a = '123';
    $scope.joinRoom = function(id){
        console.log(id);
    }
});