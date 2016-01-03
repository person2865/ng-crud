angular.module('employeeApp')
  .factory('EmployeeService', [
    '$http',
    '$log',

    function ($http, $log) {
      return {
        fetchMessages: function () {
          return $http
            .get('/data/messages.json')
            .then(successCallback, failureCallback);
        },

        fetchDesignations: function () {
          return $http
            .get('/data/designations.json')
            .then(successCallback, failureCallback);
        },

        fetchEmployees: function () {
          return $http
            .get('/data/employees.json')
            .then(successCallback, failureCallback);
        },

        addEmployee: function (item, itemList) {
          item.id = itemList[itemList.length - 1].id + 1;
          itemList.push(item);
          return itemList;
        },

        editEmployee: function (item, itemList) {
          itemList.forEach(function (el, index) {
            if (item.id === el.id) {
              itemList[index] = item;
              return false;
            }
          });
          return itemList;
        },

        deleteEmployee: function (item, itemList) {
          var newList = itemList.filter(function (el) {
            return el.id !== item.id;
          });
          return newList;
        },

        getEmployeeById: function (id, itemList) {
          var item = {};

          item.id = parseInt(id);

          itemList.forEach(function (el) {
            if (el.id === parseInt(id)) {
              item = el;
              return false;
            }
          });

          $log.debug('Get employee by id ' + id + ' = ', item);

          return item;
        }
      };

      function successCallback(response) {
        return response.data;
      }

      function failureCallback(response) {
        return response.data;
      }
    }
  ]);

