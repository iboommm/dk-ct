angular.module('app').service('adminService',['$http',function($http){
    var self = this;

     self.getToken = function() {
         return $http({
           url: "api/token/get",
           method: "GET",
           params: {page: "admin"}
        });
     };
    
     self.login = function(username,password) {
    
         var data = {'username':username,'password':password};
         return $http.post("api/login/post",data);
     };
    
     self.loadStatusFormCloud = function(pin) {
       // console.log("load from pin " +  pin);
       // return $http.post("https://cloud.arest.io/iboommmPJ/digital/" + pin + "/");
       return $http.get('http://172.20.10.12/digital/' + pin);
     }
    
     self.setStatusToBoard = function(pin,data) {
       // console.log("check pin : " + pin);
       // console.log("check data : " + data);
       return $http.get("http://172.20.10.12/digital/" + pin + "/" + data);
     }
}]);

//    var deferObject,serviceMethods = {
//        //TODO your code here
//        getToken : function(){
//           var params = {page: "admin"};
//            var promise = $http.get("api/token/get",params),
//                deferObject = deferObject || $q.defer();
//
//            promise.then(
//                function(answer){
//                    deferObject.resolve(answer);
//                },
//                function(reason){
//                    deferObject.reject(reason);
//                }
//            );
//            return deferObject.promise;
//
//        },
//        loadStatusFormCloud : function(pin){
//            // var promise = $http.get("https://cloud.arest.io/iboommmPJ/digital/"+ pin),
//            console.log("http://172.20.10.12/digital/"+ pin+"/");
//            var promise = $http.get("http://172.20.10.12/digital/"+ pin),
//                deferObject = deferObject || $q.defer();
//
//            promise.then(
//                function(answer){
//                    deferObject.resolve(answer);
//                },
//                function(reason){
//                    deferObject.reject(reason);
//                }
//            );
//            return deferObject.promise;
//
//        },
//        setStatusToBoard : function(pin,data){
//          // var promise = $http.get("https://cloud.arest.io/iboommmPJ/digital/" + pin + "/" + data),
//            var promise = $http.get("http://172.20.10.12/digital/" + pin + "/" + data),
//                deferObject = deferObject || $q.defer();
//
//            promise.then(
//                function(answer){
//                    deferObject.resolve(answer);
//                },
//                function(reason){
//                    deferObject.reject(reason);
//                }
//            );
//            return deferObject.promise;
//
//        },
//
//
//    };
//    return serviceMethods;
//    }]);
