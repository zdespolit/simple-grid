/**
 */
(function () {
  'use strict';

  var grid = angular.module('grid', ['grid.columns'])

  grid.directive('grid', function(){
    return {
      scope: {
        data: '=gridData',
        columns: '=gridColumns'
      },
      templateUrl: 'grid.html',
      controller: function($scope){
        $scope.sort = function(key){
          if ($scope.orderKey == key){
            $scope.order = !$scope.order
          } else {
            $scope.order = false
          }
          $scope.orderKey = key
        }
      }
    }
  })

  grid.filter('rowFilter', ['getColumnModel', function(getColumnModel){
    return function(data, columns){

      var result = []

      angular.forEach(data, function(row){
        var rowFits = true
        angular.forEach(columns, function(column){
          rowFits &= filterByColumn(row, column)
        })
        if (rowFits){
          result.push(row)
        }
      })

      return result

      function filterByColumn(row, column){
        var columnModel = getColumnModel(column.type)
        if (!columnModel.filter){
          return true;
        }
        return columnModel.filter(row[column.key], column.filterBy)
      }
    }
  }])

  grid.directive('gridFilterCell', ['$compile', 'getColumnModel', function($compile, getColumnModel){
    return {
      restrict: 'A',
      link: function(scope, element){

        var defaultFilterTemplate = '<td></td>',
            columnModel = getColumnModel(scope.col.type),
            html = columnModel.filterTemplate || defaultFilterTemplate

        var compiled = $compile(html)(scope)
        element.replaceWith(compiled)
      }
    }

  }])

  grid.directive('gridCell', ['$compile', 'getColumnModel', function($compile, getColumnModel){
    return {
      restrict: 'A',
      link: function(scope, element) {
        var columnModel = getColumnModel(scope.col.type),
            html = columnModel.cellTemplate
        if (!html) throw new Error('Template for column type "' + scope.col.type + '" is not defined')

        var compiled = $compile(html)(scope)
        element.replaceWith(compiled)
      }
    }
  }])


}());