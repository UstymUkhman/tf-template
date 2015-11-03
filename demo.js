(function() {
	angular.module('demo', ['ng.puppa'])
		.controller('responseController', function($scope) {
      $scope.responces = ['warning', 'angry', 'explosive'];
      $scope.selectedResp = $scope.responces[1];

      $scope.setResponse = function(selectedItem) {
      };
    })

    .controller('directiveController', function($scope) {
      $scope.valid = true;

      $scope.sayPuppa = function() {
      };
    });
})();