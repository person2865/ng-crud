angular.module('employeeApp')
  .controller('EmployeeMainController', [
    '$scope',
    '$log',
    'EmployeeService',

    function ($scope, $log, EmployeeService) {
      $scope.employees = [];
      $scope.employeeListReceived = false;
      $scope.designationsReceived = false;
      $scope.messagesReceived = false;

      $scope.loadDomainData = function () {
        EmployeeService.fetchMessages()
          .then(function (data) {
            if (angular.isDefined(data)) {
              $scope.messages = data;
              $scope.messagesReceived = true;
            } else {
              throw 'Failed to get messages.';
            }
          })
          .catch(function (error) {
            $log.debug(error);
          });

        EmployeeService.fetchDesignations()
          .then(function (data) {
            if (angular.isArray(data) && data.length > 0) {
              $scope.designations = data;
              $scope.designationsReceived = true;
            } else {
              throw 'Failed to get designations';
            }
          })
          .catch(function (error) {
            $log.debug(error);
            $scope.designations = [];
            $scope.designationsRecieved = false;
          });

        EmployeeService.fetchEmployees()
          .then(function (data) {
            if (angular.isArray(data) && data.length > 0) {
              $scope.employees = data;
              $scope.employeeListReceived = true;
            } else {
              throw 'Failed to get employees.';
            }
          })
          .catch(function (error) {
            $log.debug(error);
          });
      };

      $scope.deleteEmployee = function (id) {
        var employeeList = $scope.employees,
          deletedEmployee = EmployeeService.getEmployeeById(id, employeeList);
        $scope.employees = EmployeeService.deleteEmployee(deletedEmployee, employeeList);
      };

      $scope.loadDomainData();
    }
  ]);

