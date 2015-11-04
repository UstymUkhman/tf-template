(function() {
	angular.module('demo', ['ng.puppa'])
		.controller('responseController', function($scope) {
      $scope.responces = ['warning', 'angry', 'explosive'];
      $scope.selectedResp = $scope.responces[1];
    })

    .controller('directiveController', function($scope) {
      $scope.valid    = null;
      $scope.validate = ''; // [false, true, $scope.valid];
      $scope.submit   = document.getElementById('submit');

      $scope.validateToPuppa = function() {
        var el = angular.element($scope.submit);
        $s = el.scope();
        $injector = el.injector();
        $injector.invoke(function($compile) {
          $s.validate = [false, true, $scope.valid];
          $scope.ngPuppaOpts = {
            opr: '&&',
            ok: 'tpl/ok.tpl',
            notOk: 'tpl/notOk.tpl',
            soundOk: 'sounds/ok.mp3',
            soundNotOk: 'sounds/notOk.mp3'
          };

          $compile(el)($s);
        });
      }
    });
})();