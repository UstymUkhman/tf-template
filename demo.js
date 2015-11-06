(function() {
	angular.module('demo', ['ng.puppa'])
    .controller('directiveController', function($scope) {

      // Make a factory:
      $scope.getRandBool = function() {
        switch (parseInt(Math.random()*3)) {
          case 0: return false;
          case 1: return true;
          case 2: return null;
        }
      };

      // Make a factory:
      $scope.getCustomOpts = function() {

      };

      $scope.valid        = '';
      $scope.responces    = ['OK', '!OK', 'Custom'];
      $scope.selectedResp = $scope.responces[1];

      $scope.validate     = { 'OK': true,
                              '!OK': [false, true, $scope.getRandBool()],
                              'Custom': $scope.getRandBool()};

      $scope.validateOpts = { 'OK': { },
                              '!OK': {opr: '&&', ok: 'tpl/ok.tpl', notOk: 'tpl/notOk.tpl'},
                              'Custom': $scope.getCustomOpts()};



      $scope.setResponse = function(value) {
        $scope.valid = $scope.validate[value];
      };

      /*$scope.validateToPuppa = function() {
        $scope.validate = ;
        $scope.ngPuppaOpts = {
          opr: '&&',
          ok: 'tpl/ok.tpl',
          notOk: 'tpl/notOk.tpl',
          soundOk: 'sounds/ok.mp3',
          soundNotOk: 'sounds/notOk.mp3'
        };
      };*/

      /*$scope.validateToPuppa = function() {
        var el = angular.element($scope.submit);

        $s = el.scope();
        $injector = el.injector();
        $injector.invoke(function($compile) {
          $s.validate = [false, true, $scope.valid];
          $s.ngPuppaOpts = {
            opr: '&&',
            ok: 'tpl/ok.tpl',
            notOk: 'tpl/notOk.tpl',
            soundOk: 'sounds/ok.mp3',
            soundNotOk: 'sounds/notOk.mp3'
          };

          $compile(el)($s);
        });
      }*/
  });

  document.addEventListener('click', function() {
    var alert = document.getElementById('alert');
    if (alert) alert.className = 'animated bounceOutUp';
  });
})();