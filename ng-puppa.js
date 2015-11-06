/*!
 * angular-ng-p.u.ppa
 * https://github.com/UstymUkhman/ng-p.u.pp.a
 * Version: 1.0.0 - 2015-11-02T23:59:59.999Z
 * License: MIT
 */


(function () {
'use strict';
/**
 * General-purpose AngularJS directive validator.
 * angular.js comes with several built-in validation mechanism for input fields (ngRequired, ngPattern etc.), however, by using this directive
 * it's possible to handle both validation outcome (true or false) by specifying a custom template for each of results (or just for one of them).
 * The ng-puppa directive makes it easy to use any variable(s) defined in scope as a validator variable(s).
 * A validator variable will trigger directive's validation process every time the variable(s) changes.
 *
 * This utility bring 'ng-puppa' directives to handle regular validations.
 *
 * @example <div ng-puppa="puppa"></div>                              --> @param puppa {boolean|number|string}        - $scope variable
 * @example <div ng-puppa="[puppa, puppMelo]"></div>                  --> @param {boolean[]}                          - array of boolean variables
 * @example <div ng-puppa="puppa" ng-puppa-opts="puppaOptions"></div> --> @param puppa        {boolean|number|string} - $scope variable
 *                                                                        @param puppaOptions {Object}                - $scope variable   
 * 
 * @param ng-puppa {boolean|number|string} Each variable passed to 'ng-puppa' will be first parsed to its boolean corresponding value and,
 * after its evaluation, the final value (true/false) will trigger one two possible template files (specified in ng-puppa-opts) to replace
 * directive's <tag> element with the HTML of the chosen template. You can develop your personal templates and specify their relative path
 * in an object passed to 'ng-puppa-opts' attribute which requires to be implemented in the same <tag> of 'ng-puppa' attribute.
 *
 * @param ng-puppa {boolean[]|number[]|string[]} 'ng-puppa' also accepts an array of values (even with mixed types); it will evaluate each
 * element to its boolean value and then it will create an array of booleans. The final result for ng-puppa will be the join of each value
 * of this array by using a logical operator.
 *
 * @param ng-puppa-opts {Object} Each attribute of this object is optional because main of them have default values assigned by the directive.
 * This is how 'ng-puppa-opts' is structured:
 *
 * opr        {string} - operator used to join the eventual array of values passed to 'ng-puppa' ['OR' operator (||) is the default one]
 * ok         {string} - absolute or relative path to a template file if 'ng-puppa' returns true; 'tpl/ok.tpl' is the default one, you can change or override it
 * notOk      {string} - absolute or relative path to a template file if 'ng-puppa' returns false; 'tpl/notOk.tpl' is the default one, you can change or override it
 * soundOk    {string} - absolute or relative path to an audio file if 'ng-puppa' returns true
 * soundNotOk {string} - absolute or relative path to an audio file if 'ng-puppa' returns false
 */
angular.module('ng.puppa',[])
  .directive('ngPuppa', ['$http', '$templateCache', '$compile', '$$ngPuppaWatcher',
    function ($http, $templateCache, $compile, $$ngPuppaWatcher) {

      return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
          var checkSounds = function(opts) {
                var attrs = [];
                for (var key in opts) {
                  if (typeof opts[key] === 'string')
                    attrs[key] = opts[key];
                  else if (typeof opts[key] === 'object' && opts[key].tagName === 'AUDIO')
                    attrs[key] = opts[key].src;
                }
                return attrs;
              },

              compileTplURL = function(tpl) {
                $http.get(tpl, {cache: $templateCache}).success(function(tplContent){
                  elm.replaceWith($compile(tplContent)(scope));                
                });
              };

          scope.$watch(attrs.ngPuppa, function() {
            $$ngPuppaWatcher(scope, attrs, checkSounds, compileTplURL);
          });

          scope.$watch(attrs.ngPuppaOpts, function() {
            $$ngPuppaWatcher(scope, attrs, checkSounds, compileTplURL);
          });
        }
      };
    }
  ])

  .service('$$ngPuppaWatcher', function () {
    return function (scope, attrs, sound, compileTpl) {
      var validateExpr = (attrs.ngPuppa === '')
                       ? attrs.ngPuppa
                       : scope.$eval(attrs.ngPuppa),

               objExpr = '',
                  opts = scope.ngPuppaOpts || scope.$eval(attrs.ngPuppaOpts) ||
                   {opr: '||', ok: 'tpl/ok.tpl', notOk: 'tpl/notOk.tpl'};

      if (validateExpr === '') return;
      if (typeof opts.opr !== 'string') opts.opr = '||';

      angular.forEach(validateExpr, function (expr, key) {
        var conditions = validateExpr.length - 1;
        objExpr += expr+' ';
        if (key < conditions) objExpr += opts.opr+' ';
      });

      var sounds = sound({ok: opts.soundOk, notOk: opts.soundNotOk});
      var resp = !objExpr ? validateExpr : scope.$eval(objExpr);
      new Audio(resp ? sounds.ok : sounds.notOk);//.play();
      compileTpl(resp ? opts.ok : opts.notOk);
      return resp;
    };
  })

}());