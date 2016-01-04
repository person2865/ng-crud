var employeeApp = angular.module('employeeApp', ['ui.router']);

employeeApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'scripts/employee/table.template.html',
      resolve: {
        messages: function (EmployeeService) {
          return EmployeeService
            .fetchMessages()
            .then(function (data) {
              if (angular.isDefined(data)) {
                return data;
              } else {
                throw 'Cannot get messages.';
              }
            })
            .catch(function (error) {
              $log.debug(error);
            });
        },
        designations: function (EmployeeService) {
          return EmployeeService
            .fetchDesignations()
            .then(function (data) {
              if (angular.isArray(data) && data.length > 0) {
                return data;
              } else {
                throw 'Cannot get designations.';
              }
            })
            .catch(function (error) {
              $log.debug(error);
            });
        },
        employees: function (EmployeeService) {
          return EmployeeService
            .fetchEmployees()
            .then(function (data) {
              if (angular.isArray(data) && data.length > 0) {
                return data;
              } else {
                throw 'Cannot get employees list.';
              }
            })
            .catch(function (error) {
              $log.debug(error);
            });
        },
        domainData: function (messages, designations, employees) {
          var domainData = {};
          domainData.messages = messages;
          domainData.designations = designations;
          domainData.employees = employees;
          return domainData;
        }

      },
      controller: 'EmployeeMainController'
    })
    .state('home.edit', {
      url: '/edit/{employeeId}',
      templateUrl: 'scripts/employee/addEdit.template.html',
      controller: 'EmployeeAddEditController'
    });

  /*function getDomainData($log, EmployeeService) {
   var domainData = {};
   domainData.messages = EmployeeService
   .fetchMessages()
   .then(function (data) {
   if (angular.isDefined(data)) {
   return data;
   } else {
   throw 'Cannot get messages.';
   }
   })
   .catch(function (error) {
   $log.debug(error);
   });
   domainData.designations = EmployeeService
   .fetchDesignations()
   .then(function (data) {
   if (angular.isArray(data) && data.length > 0) {
   return data;
   } else {
   throw 'Cannot get designations.';
   }
   })
   .catch(function (error) {
   $log.debug(error);
   });
   domainData.employees = EmployeeService
   .fetchEmployees()
   .then(function (data) {
   if (angular.isArray(data) && data.length > 0) {
   return data;
   } else {
   throw 'Cannot get employees list.';
   }
   })
   .catch(function (error) {
   $log.debug(error);
   });

   return domainData;
   }*/
});