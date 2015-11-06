(function() {
	angular.module('demo', ['ng.puppa'])
    .controller('directiveController', function($scope, getCustomOpts, getRandBool) {

      $scope.responces    = ['OK', '!OK', 'Custom'];
      $scope.selectedResp = $scope.responces[1];

      $scope.valid        = '';
      $scope.validate     = { 'OK': true,
                              '!OK': [false, true, getRandBool()],
                              'Custom': getRandBool()};

      $scope.validOpts    = { };
      $scope.validateOpts = { 'OK': {ok: 'tpl/ok.tpl', notOk: 'tpl/notOk.tpl'},
                              '!OK': {opr: '&&', ok: 'tpl/ok.tpl', notOk: 'tpl/notOk.tpl'},
                              'Custom': getCustomOpts()};

      $scope.validateToPuppa = function(value) {
        $scope.valid     = $scope.validate[value];
        $scope.validOpts = $scope.validateOpts[value];
      };
  })

  // You can setup here your a logical operator to use in 'ng-puppa'
  // and your custom templates and sounds to try this demo to the best
  .factory('getCustomOpts', function() {
    return function() {
      return {
        opr:        '==',
        ok:         'tpl/customOk.tpl',
        notOk:      'tpl/customNotOk.tpl',
        soundOk:    '',
        soundNotOk: ''
      };
    };
  })

  // Just because
  .factory('getRandBool', function() {
    return function() {
      switch (parseInt(Math.random()*3)) {
        case 0: return false;
        case 1: return  true;
        case 2: return  null;
      }
    };
  });

  document.addEventListener('click', function() {
    var alert = document.getElementById('alert');
    if (alert) alert.className = 'animated bounceOutUp';
  });
})();