var app = angular.module("app",["firebase"]);

app.controller("indexController",function($scope,$firebaseArray,$firebaseObject,adminService,$q) {
    $scope.username = "Admin";
    $scope.password = "123";
    $scope.toggleNode = false;
    
    $scope.toggleActivate = false;

    var logging = function() {
        var ref = firebase.database().ref().child("member");
        $scope.dataLogin = $firebaseArray(ref);
        console.log($scope.dataLogin);
    }

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        var data = $scope.dataLogin;

        var pass = data[0].$value;
        var user = data[1].$value;

        if(user == username && pass == password) {
          $scope.toggleNode = true;
          loadingNodeStatus();
        }else {
          console.log("errr");
          console.log(user+" ++ "+ username+" ++ "+  pass +" ++ "+  password)
        }
    }
    logging();

    var loadingNodeStatus = function() {
        var ref = firebase.database().ref().child("node_1");
        var syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope, "dataNode");
    }
    
    $scope.setStatusOn = function(data) {
        var data = data+1;
        $scope.dataNode['pin_' + data].status = 1;
        var promise = adminService.setStatusToBoard(data,1);
        promise.then(
            function(data) {
                console.log(data);
            }
        )
    }
    $scope.setStatusOff = function(data) {
        var data = data+1;
        $scope.dataNode['pin_' + data].status = 0;
        var promise = adminService.setStatusToBoard(data,0);
        promise.then(
            function(data) {
                console.log(data);
            }
        )
        
    }
    
    $scope.onPin = function(data) {
        var data = data+1;
        $scope.dataNode['pin_' + data].toggle = 1;
    }
    $scope.offPin = function(data) {
        var data = data+1;
        $scope.setStatusOff(data-1);
        $scope.dataNode['pin_' + data].toggle = 0;
    }
    
    
    
    $scope.debug = function() {
        console.log($scope.dataNode);
        delete($scope.dataNode.$id);
        delete($scope.dataNode.$priority);
        
    }
    
    $scope.returnStatus = function(data) {
        if(data == 1) {
            return "On";
        }else {
            return "Off";
        }
    }


});
