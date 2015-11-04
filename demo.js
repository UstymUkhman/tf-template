(function() {
	angular.module('demo', ['ng.puppa'])
		.controller('responseController', function($scope) {
      $scope.responces = ['warning', 'angry', 'explosive'];
      $scope.selectedResp = $scope.responces[1];
    })

    .controller('directiveController', function($scope) {
      $scope.submit = document.getElementById('submit');
      $scope.valid = null;
      $scope.ngPuppaOpts = {
        opr: '||',
        ok: 'tpl/ok.tpl',
        notOk: 'tpl/notOk.tpl',
        soundOk: 'sounds/ok.mp3',
        soundNotOk: 'sounds/notOk.mp3'
      };

      $scope.validateToPuppa = function() {
        var ngPuppa = [false, true, $scope.valid];

        var el = angular.element($scope.submit);
        $scope = el.scope();
        $injector = el.injector();
        $injector.invoke(function($compile) {          
          el[0].attributes['ng-puppa'].value = true;
          $compile(el)($scope);
        });
      }
    });
})();