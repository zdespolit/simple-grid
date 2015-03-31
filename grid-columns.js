/**
 */
(function () {
  'use strict';

  var columns = angular.module('grid.columns', [])

  columns.value('getColumnModel', function(type){
   if (!colModels[type]){
     throw new Error('Column type "'+ type +'" is not registered')
   } else {
     return colModels[type]
   }
  })

  /**
   * Define columns
   */
  var stringColumn = {

    cellTemplate: '<td string-cell cell-value="row[col.key]" column="col"></td>',

    filter: function(value, filterBy){
      if (!filterBy) return true // nothing can be contained by anything
      if (!value) return false // nothing can't contain anything
      value = value.toLocaleLowerCase()
      filterBy = filterBy.toLocaleLowerCase()
      return value.indexOf(filterBy) >= 0
    },

    filterTemplate: '<td><input type="text" ng-model="col.filterBy"/></td>'

  }

  var booleanColumn = {

    cellTemplate: '<td boolean-cell cell-value="row[col.key]" column="col"></td>',

    filter: function(value, filterBy){
      return filterBy ? filterBy == value : true
    },

    filterTemplate: '<td><input type="checkbox" ng-model="col.filterBy"/></td>'
  }

  var actionColumn = {

    cellTemplate: '<td><div class="btn {{col.className}}" ng-click="col.action(row)">{{col.actionName}}</div></td>'
  }

  /**
   * Register columns
   */
  var colModels = {
    string: stringColumn,
    boolean: booleanColumn,
    action: actionColumn
  }

  columns.directive('stringCell', function() {
    return {
      restrict: 'A',
      scope: {
        value: '=cellValue',
        column: '='
      },
      replace: true,
      template:
          '<td ng-dblClick="toEditMode()">' +
              '<div ng-if="mode == \'view\'">{{value}}</div> ' +
              '<input ng-if="mode == \'edit\'" type="text" value="{{::value}}" ng-esc="switch(false)" ng-enter="switch()" />' +
              '</td>',


      controller: function($scope, $element){
        $scope.mode = 'view'
        $scope.switch = function(save){
          if ($scope.mode == 'edit' && save !== false){
            var value = $element.find('input').val()
            if ($scope.column.validate && $scope.column.validate(value)){
              $scope.value = value
            }
          }
          $scope.mode = $scope.mode == 'view' ? 'edit': 'view'
        }
        $scope.toEditMode = function(){
          if ($scope.column.editable == false){
            return
          }
          $scope.mode = 'edit'
          $element[0].focus()
        }
      }

    };
  })

  columns.directive('booleanCell', function(){
    return {
      restrict: 'A',
      scope: {
        value: '=cellValue',
        column: '='
      },
      replace: true,
      template: '<td class="cell" ng-class="{green: value}" ng-click="click($event)"><input type="checkbox" ng-model="value"></td>',

      controller: function($scope, $element){
        $scope.click = function($event){
          if ($event.target == $element[0]){ // don't support ie8
            $scope.value = !$scope.value
          } else {
            // checkbox has already done the job
          }
          if ($scope.column.click){
            $scope.column.click($scope.value)
          }
        }
      }
    }
  })

  columns.directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter)
          });
          event.preventDefault()
        }
      });
    };
  });

  columns.directive('ngEsc', function () {
    return function (scope, element, attrs) {
      element.bind("keyup", function (event) {
        if(event.which === 27) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEsc)
          });
          event.preventDefault()
        }
      });
    };
  });

}());