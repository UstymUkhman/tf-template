/*!
 * angular-tf-template
 * https://github.com/UstymUkhman/tf-template
 * Version: 1.0.0 - 2015-11-02T23:59:59.999Z
 * License: MIT
 */


;(function () {
'use strict';

/**
 * General-purpose AngularJS directive validator.
 *
 * angular.js comes with several built-in validation mechanism for input fields (ngRequired, ngPattern etc.), however, by using this directive
 * it's possible to handle both validation outcome (true or false) by specifying a custom template for each of results (or just for one of them).
 * The tf-template directive makes it easy to use any variable(s) defined in scope as a validator variable(s). A validator variable will trigger
 * directive's validation process every time the variable(s) changes.
 * This utility bring 'tf-template' directives to handle regular validations.
 *
 * @example <div tf-template="cond"></div>                                --> @param cond {boolean|number|string}        - $scope variable
 * @example <div tf-template="[cond1, cond2]"></div>                      --> @param {boolean[]}                         - array of boolean variables
 * @example <div tf-template="cond" tf-template-opts="condOptions"></div> --> @param cond        {boolean|number|string} - $scope variable
 *                                                                            @param condOptions {Object}                - $scope variable
 * 
 * @param tf-template {boolean|number|string} Each variable passed to 'tf-template' will be first parsed to its boolean corresponding value and,
 * after its evaluation, the final value (true/false) will trigger one two possible template files (specified in tf-template-opts) to replace
 * directive's <tag> element with the HTML of the chosen template. You can develop your personal templates and specify their relative path
 * in an object passed to 'tf-template-opts' attribute which requires to be implemented in the same <tag> of 'tf-template' attribute.
 *
 * @param tf-template {boolean[]|number[]|string[]} 'tf-template' also accepts an array of values (even with mixed types); it will evaluate each
 * element to its boolean value and then it will create an array of booleans. The final result for tf-template will be the join of each value
 * of this array by using a logical operator.
 *
 * @param tf-template-opts {Object} Each attribute of this object is optional because main of them have default values assigned by the directive.
 * This is how 'tf-template-opts' is structured:
 *
 * opr        {string} - operator used to join the eventual array of values passed to 'tf-template' ['OR' operator (||) is the default one]
 * ok         {string} - absolute or relative path to a template file if 'tf-template' returns true; 'tpl/ok.tpl' is the default one, you can change or override it
 * notOk      {string} - absolute or relative path to a template file if 'tf-template' returns false; 'tpl/notOk.tpl' is the default one, you can change or override it
 * soundOk    {string} - absolute or relative path to an audio file if 'tf-template' returns true
 * soundNotOk {string} - absolute or relative path to an audio file if 'tf-template' returns false
 */

angular.module('tf.template',[])
  .directive('tfTemplate', ['$http', '$templateCache', '$compile', '$$tfTemplateWatcher',
    function ($http, $templateCache, $compile, $$tfTemplateWatcher) {

      return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
          var checkSounds = function(opts) {
            var attrs = [];
            for (var key in opts) {
              if (typeof opts[key] === 'string' && opts[key].length)
                attrs[key] = opts[key];
              else if (typeof opts[key] === 'object' && opts[key].tagName === 'AUDIO')
                attrs[key] = opts[key].src;
            }
            return attrs;
          },

          compileTplURL = function(tpl) {
            $http.get(tpl, {cache: $templateCache}).success(function(tplContent) {
              elm.html($compile(tplContent)(scope).html());
            });
          };

          scope.$watch(attrs.tfTemplate, function() {
            $$tfTemplateWatcher(scope, attrs, checkSounds, compileTplURL);
          });

          scope.$watch(attrs.tfTemplateOpts, function() {
            $$tfTemplateWatcher(scope, attrs, checkSounds, compileTplURL);
          });
        }
      };
    }
  ])

  .service('$$tfTemplateWatcher', function () {
    return function (scope, attrs, sound, compileTpl) {

      var validateExpr = (attrs.tfTemplate === '')
                       ? attrs.tfTemplate
                       : scope.$eval(attrs.tfTemplate),

               objExpr = '',
                  opts = scope.tfTemplateOpts || scope.$eval(attrs.tfTemplateOpts) ||
                   {opr: '||', ok: 'tpl/ok.tpl', notOk: 'tpl/notOk.tpl'};

      if (validateExpr === '') return;
      if (typeof opts.opr !== 'string') opts.opr = '||';

      angular.forEach(validateExpr, function (expr, key) {
        objExpr += expr+' ';
        if (key < validateExpr.length - 1) objExpr += opts.opr+' ';
      });

      var sounds = sound({ok: opts.soundOk, notOk: opts.soundNotOk});
      var resp = !objExpr ? validateExpr : scope.$eval(objExpr);
      new Audio(resp ? sounds.ok : sounds.notOk).play();
      compileTpl(resp ? opts.ok : opts.notOk);
      return resp;
    };
  })

}());