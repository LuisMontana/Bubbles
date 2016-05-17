// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('miigo', ['ionic', 'miigo.controllers', 'miigo.services', 'miigo.directives', 'angular-svg-round-progressbar', 'ngDraggable', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.card', {
      url: '/card',
      views: {
        'tab-card': {
          templateUrl: 'templates/tab-card.html',
          controller: 'CardCtrl'
        }
      }
  })

  .state('tab.wish', {
      url: '/wish',
      views: {
        'tab-wish': {
          templateUrl: 'templates/tab-wish.html',
          controller: 'WishCtrl'
        }
      }
    })
    .state('tab.wish-detail', {
      url: '/wish/:wishId',
      views: {
        'tab-wish': {
          templateUrl: 'templates/wish-detail.html',
          controller: 'WishDetailCtrl'
        }
      }
    })
    
  .state('tab.bubbles', {
      url: '/bubbles',
      views: {
        'tab-bubbles': {
          templateUrl: 'templates/tab-bubbles.html',
          controller: 'BubblesCtrl'
        }
      }
    })
    .state('tab.bubbles-overview', {
    url: '/bubbles/:budgetId',
      views: {
        'tab-bubbles': {
          templateUrl: 'templates/bubbles-overview.html',
          controller: 'BubblesOvwCtrl'
        }
      }
    })


  .state('tab.points', {
    url: '/points',
    views: {
      'tab-points': {
        templateUrl: 'templates/tab-points.html',
        controller: 'PointsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
