(function() {
	angular.module('demo', ['ng.puppa'])
		.controller('responseController', function($scope) {
      $scope.responces = ['warning', 'angry', 'explosive'];
      $scope.selectedResp = $scope.responces[1];
    })

    .controller('directiveController', function($scope) {
      $scope.validate = '';
      $scope.valid    = null;
      $scope.submit   = document.getElementById('response');

      $scope.validateToPuppa = function() {
        var el = angular.element($scope.submit);

        $s = el.scope();
        $injector = el.injector();
        $injector.invoke(function($compile) {
          $s.validate = true; // [false, true, $scope.valid];
          $s.ngPuppaOpts = {
            opr: '&&',
            ok: 'tpl/ok.tpl',
            notOk: 'tpl/notOk.tpl',
            soundOk: 'sounds/ok.mp3',
            soundNotOk: 'sounds/notOk.mp3'
          };

          $compile(el)($s);
          document.getElementsByTagName('body')[0].className = 'dack-theme';
        });
      }
    });

  document.addEventListener('click', function() {
    var alert = document.getElementById('alert');

    if (alert) {
      alert.className = 'animated bounceOutUp';
      document.getElementsByTagName('body')[0].className  = '';
    }
  });
})();