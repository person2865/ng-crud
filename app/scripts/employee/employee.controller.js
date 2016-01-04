angular.module('employeeApp')
  .controller('EmployeeMainController', [
    '$scope',
    '$log',
    'EmployeeService',
    'domainData',

    function ($scope, $log, EmployeeService, domainData) {
      $scope.employeesReceived = false;

      $scope.loadDomainData = function () {
        $scope.messages = domainData.messages;
        $log.debug('$scope.messages = ', $scope.messages);

        $scope.designations = domainData.designations;
        $log.debug('$scope.designations = ', $scope.designations);

        $scope.employees = domainData.employees;
        $log.debug('$scope.employees = ', $scope.employees);

        if(angular.isArray($scope.employees) && $scope.employees.length > 0) {
          $scope.employeesReceived = true;
        }
      };

      $scope.deleteEmployee = function (id) {
        var employeeList = $scope.employees,
          deletedEmployee = EmployeeService.getEmployeeById(id, employeeList);
        $scope.employees = EmployeeService.deleteEmployee(deletedEmployee, employeeList);
      };

      $scope.loadDomainData();
    }
  ]);

