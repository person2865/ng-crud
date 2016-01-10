angular.module('employeeApp').controller('TestCtrl', [
  '$scope',
  '$window',
  function($scope, $window) {
    $scope.master = {
      name: ''
    };
    $scope.test = angular.copy($scope.master);
    $scope.reset = function() {
      $scope.test = angular.copy($scope.master);
      $scope.form2.$setPristine();
    };
    $scope.submit = function() {
      $scope.master = angular.copy($scope.test);
      $window.alert($scope.master.name);
    };
  }
]);
