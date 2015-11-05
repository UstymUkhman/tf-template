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
 * @example <div ng-puppa="false"></div> --> @param - boolean variable
 * @example <div ng-puppa="puppa"></div> --> @param puppa {boolean|number|string} - $scope variable
 * @example <div ng-puppa="[puppa, puppMelo]"></div> --> @param {boolean[]} - array of boolean variables
 * @example <div ng-puppa="puppa"></div> -->
 * @example <div ng-puppa="puppa"></div> -->
 * @example <input ui-validate-async="{ foo: 'myAsyncValidatorFunction($value, anotherModel)' }" ui-validate-watch=" 'anotherModel' ">
 *
 * @param ui-validate {string|object literal} If strings is passed it should be a scope's function to be used as a validator.
 * If an object literal is passed a key denotes a validation error key while a value should be a validator function.
 * In both cases validator function should take a value to validate as its argument and should return true/false indicating a validation result.
 * It is possible for a validator function to return a promise, however promises are better handled by ui-validate-async.
 *
 * @param ui-validate-async {string|object literal} If strings is passed it should be a scope's function to be used as a validator.
 * If an object literal is passed a key denotes a validation error key while a value should be a validator function.
 * Async validator function should take a value to validate as its argument and should return a promise that resolves if valid and reject if not,
 * indicating a validation result.
 * ui-validate-async supports non asyncronous validators. They are wrapped into a promise. Although is recomented to use ui-validate instead, since
 * all validations declared in ui-validate-async are registered un ngModel.$asyncValidators that runs after ngModel.$validators if and only if
 * all validators in ngModel.$validators reports as valid.
 */
angular.module('ng.puppa',[])
  .directive('ngPuppa', function ($http, $templateCache, $compile) {

    return {
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {
        var objExpr = '',
            validateExpr = (attrs.ngPuppa === '')
                         ? attrs.ngPuppa
                         : scope.$eval(attrs.ngPuppa),

            opts = scope.ngPuppaOpts || scope.$eval(attrs.ngPuppaOpts) ||
                   {opr: '||', ok: 'tpl/ok.tpl', notOk: 'tpl/notOk.tpl'},

            checkSounds = function(opts) {
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

        if (validateExpr === '') return;
        if (typeof opts.opr !== 'string') opts.opr = '||';

        angular.forEach(validateExpr, function (expr, key) {
          var conditions = validateExpr.length - 1;
          objExpr += expr+' ';
          if (key < conditions) objExpr += opts.opr+' ';
        });

        var sounds = checkSounds({ok: opts.soundOk, notOk: opts.soundNotOk});
        var resp = !objExpr ? validateExpr : scope.$eval(objExpr);
        new Audio(resp ? sounds.ok : sounds.notOk);//.play();
        compileTplURL(resp ? opts.ok : opts.notOk);
        return resp;
      }
    };
  });

}());