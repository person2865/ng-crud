angular.module('employeeApp')
  .controller('EmployeeAddEditController', [
    '$scope',
    '$log',
    '$stateParams',
    'EmployeeService',
    '$window',

    function ($scope, $log, $stateParams, EmployeeService, $window) {
      var employeeList = $scope.employees;

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

      $scope.validateSalary = function () {
        var salary = $scope.employeeFormModel.salary,
            designation = $scope.employeeFormModel.designation,
            salaryValid = false;

        switch(designation) {
          case 'Consultant':
            salaryValid = salary <= 35000 && salary >= 30000;
            $log.debug('Salary invalid:: Salary = ' + salary);
            break;
          case 'Snr. Consultant':
            salaryValid = salary <= 40000 && salary >= 36000;
            break;
          case 'Lead':
            salaryValid = salary <= 45000 && salary >= 41000;
            break;
          case 'Asst. Manager':
            salaryValid = salary <= 50000 && salary >= 46000;
            break;
          case 'Manager':
            salaryValid = salary <= 55000 && salary >= 51000;
            break;
          case 'Snr. Manager':
            salaryValid = salary <= 80000 && salary >= 56000;
            break;
          default:
            salaryValid = salary <= 80000 && salary >= 30000;
            break;
        }
        $scope.employeeForm.salary.$setValidity('salary', salaryValid);
      };

      $scope.resetForm();
    }

  ]);