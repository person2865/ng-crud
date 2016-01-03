angular.module('employeeApp')
  .controller('EmployeeAddEditController', [
    '$scope',
    '$log',
    '$stateParams',
    'EmployeeService',
    '$window',

    function ($scope, $log, $stateParams, EmployeeService, $window) {
      var employeeId = $stateParams.employeeId,
        employeeList = $scope.employees;

      $scope.employeeFormModel = {};
      $scope.employee = {};

      $scope.resetForm = function () {
        $scope.employee = EmployeeService.getEmployeeById(employeeId, employeeList);
        if(!$scope.employee.designation) {
          $scope.employee.designation = $scope.designations ? $scope.designations[0] : 'Consultant';
        }
        $scope.employeeFormModel = angular.copy($scope.employee);
      };

      $scope.submitEmployee = function () {
        $scope.employee = angular.copy($scope.employeeFormModel);
        if ($scope.employee.id && $scope.employee.id > 0) {
          //edit existing employee
          EmployeeService.editEmployee($scope.employee, $scope.employees);
        } else {
          //add new employee
          EmployeeService.addEmployee($scope.employee, $scope.employees);
        }
        $window.location = '#';
      };

      $scope.$watch('employees', $scope.resetForm());
    }

  ]);