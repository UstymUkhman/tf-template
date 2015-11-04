(function() {
	angular.module('demo', ['ng.puppa'])
		.controller('responseController', function($scope) {
      $scope.responces = ['warning', 'angry', 'explosive'];
      $scope.selectedResp = $scope.responces[1];
    })

    .controller('directiveController', function($scope) {
      $scope.valid = null;
      $scope.ngPuppaOpts = {
        ok: 'tpl/ok.tpl',
        notOk: 'tpl/notOk.tpl',
        soundOk: 'sounds/ok.mp3',
        soundNotOk: 'sounds/notOk.mp3'
      };
    });
})();