// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config (function($stateProvider,$urlRouterProvider){
    $stateProvider
//'tabs': name of the state, {} definition of the object attributes
        .state('tabs', {
//object containing these 3 elements
            url:'/tab',
            abstract:true,
            templateUrl:'templates/tabs.html'
    })
//list is a child of tabs
        .state('tabs.list',{
            url:'/list',
//single view called list tab, which is an object
            views: {
            'list-tab':{
            templateUrl: 'templates/list.html',
            controller: 'ListController'
                }
            }
    })
        
        .state('tabs.detail',{
//aId : temporary url for artist id
            url:'/list/:aId',
//single view called list tab, which is an object
            views: {
            'list-tab':{
            templateUrl: 'templates/detail.html',
            controller: 'ListController'
                }
            }
    })
    
    
    
        .state('tabs.home',{
            url:'/home',
            views: {
            'home-tab':{
            templateUrl: 'templates/home.html',
            controller: 'ListController'
                }
            }
    })
    
    
    $urlRouterProvider.otherwise('/tab/home');
})


.controller('ListController', ['$scope','$http','$state',function($scope, $http, $state){
    $http.get('js/data.json').success(function(data){
        $scope.artists = data.artists;
//object params has any parameter that we pass through the url
        $scope.whichartist=$state.params.aId;
        
        $scope.onItemDelete = function(item){
            $scope.artists.splice($scope.artists.indexOf(item),1);
        }
        
        $scope.doRefresh = function(){
        $http.get('js/data.json').success(function(data){
            $scope.artists = data.artists; 
            $scope.$broadcast('scroll.refreshComplete');
            });
        }
        
        $scope.toggleStar = function(item){
            item.star =!item.star; 
        }
        
        $scope.moveItem=function(item,fromIndex,toIndex){
            $scope.artists.splice(fromIndex,1);
            $scope.artists.splice(toIndex, 0, item);
        };
        
    });
}]);