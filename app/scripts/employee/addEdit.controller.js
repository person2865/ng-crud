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
        //load employee based on stateParams
        $scope.employee = EmployeeService.getEmployeeById($stateParams.employeeId, employeeList);

        //if employee does not have a designation, load the default designation
        if(!$scope.employee.designation) {
          $scope.employee.designation = $scope.designations[0];
        }

        $log.debug('employee = ', $scope.employee);

        //make a copy fo the employee to use in the form
        $scope.employeeFormModel = angular.copy($scope.employee);
        $log.debug('employeeFormModel = ', $scope.employeeFormModel);

        //reset form state
        if($scope.employeeForm) {
          $log.debug('setting form as pristine');
          $scope.employeeForm.$setPristine();
        }

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

      $scope.resetForm();
      //$scope.$watch('employees', $scope.resetForm());









    }

  ]);