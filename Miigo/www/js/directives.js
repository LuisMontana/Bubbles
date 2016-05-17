angular.module('miigo.directives', [])

.directive('miigoStatus', function() {
    return {
        restrict: 'EA',
        templateUrl: 'templates/shared/status.html',
        scope: {
            user: '=user'
        }
    };
});
