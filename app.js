/**
 */
(function () {
  'use strict'

  var app = angular.module('app',['grid'])

  app.controller('MainController', ['$scope', function($scope){

    $scope.columns = [{
      name: 'Name',
      type: 'string',
      editable: false
    },{
      name: 'Description',
      type: 'string',
      validate: function(){
        return Math.random() > 0.2
      }
    },{
      name: 'Details',
      type: 'string',
      validate: function(value){
        return !value || value.indexOf('fuck') < 0
      }
    },{
      name: 'Email',
      type: 'string',
      validate: function(value){
        return value.indexOf('@') >= 0
      }
    },{
      name: 'Active',
      type: 'boolean'
    },{
      name: 'Locked',
      type: 'boolean'
    }]

    $scope.columns2 = [{
      name: 'Name',
      type: 'string',
      editable: false,
      sortable: true
    },{
      name: 'Email',
      type: 'string',
      editable: false,
      sortable: true
    }, {
      name: 'Delete',
      actionName: 'Delete',
      type: 'action',
      className: 'btn-danger',
      editable: false,
      action: function(item){
        $scope.remove(item)
      }
    }];

    angular.forEach($scope.columns, function(col){
      col.key = col.name.toLowerCase()
      if (col.type == 'string') col.sortable = true;
      if (col.editable !== false) col.editable = true;
    })

    angular.forEach($scope.columns2, function(col){
      col.key = col.name.toLowerCase()
    })

    $scope.data = [
      {name: 'John Doe', description:'A man', details: 'allow everything except some word', email: 'good.guy@yahoo.com'},
      {name: 'Gustav Holst', description:'Musician', details: "an English composer, arranger and teacher. Best known for his orchestral suite The Planets"},
      {name: 'Vladimir Vysotsky', description:'Musician'},
      {name: 'Kazimir Malevich', description:'Artist', email:'founder@pixel.art'},
      {name: 'Abraham Lincoln', description:'American president', email: 'abraham@white.house'}
    ]

    $scope.remove = function(item){
      var i = $scope.data.indexOf(item)
      $scope.data.splice(i, 1)
    }

    $scope.value = 1
    $scope.orderKey = null
    $scope.order = false


  }])


}());