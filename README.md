# ng-p.u.pp.a [![GitHub version](https://badge.fury.io/gh/UstymUkhman%2Fng-p.u.pp.a.svg)](https://badge.fury.io/gh/UstymUkhman%2Fng-p.u.pp.a) [![Join the chat at https://gitter.im/angular-ui/ui-validate](https://badges.gitter.im/Join%20Chat.svg)]([![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/UstymUkhman/ng-p.u.pp.a?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge))

AngularJS badass directive

Angular.js comes with several built-in validation mechanism for input fields (ngRequired, ngPattern etc.), however, by using this directive
it's possible to handle both validation outcome (true or false) by specifying a custom template for each of results (or just for one of them). 
The ng-puppa directive makes it easy to use any variable(s) defined in scope as a validator variable(s). A validator variable will trigger
directive's validation process every time the variable(s) changes.

## Requirements

- AngularJS

## Usage


You can get it from [Bower](http://bower.io/)

```sh
bower install git://github.com/UstymUkhman/ng-p.u.pp.a.git
```

Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ng-p.u.pp.a/dist/ng-puppa.js"></script>
```

Add the specific module to your dependencies:

```javascript
angular.module('myApp', ['ng.puppa', ...])
```

##### OR

You can just download this repository:

```sh
git clone https://github.com/UstymUkhman/ng-p.u.pp.a.git
```

Use the script file in your application:

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
<script type="text/javascript" src="./src/ng-puppa.js"></script>
```

And add the module to your dependencies:

```javascript
angular.module('myApp', ['ng.puppa', ...])
```
