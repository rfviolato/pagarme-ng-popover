# pagarme-ng-popover
Pagar.me's simple directive to provide pop-over functionality

## [Demo here!](http://pagarme.github.io/pagarme-ng-popover/)

#### Installation

Install via npm package manager:
```
$ npm install pg-ng-popover
```

Import the directive file into your project:
```html
<script src="node_modules/pg-ng-popover/dest/pg-ng-popover.min.js"></script>
```

If you wish the same style of the example, import the css.
```html
<link rel="stylesheet" type="text/css" href="dest/css/pg-ng-popover.min.css">
```

Load the pg-ng-popover module:
```javscript
angular.module('myApp', ['pg-ng-popover']);
```

Call the directive in an element via attribute or tag name:
```html
<div data-pg-ng-popover></div>
<pg-ng-popover></pg-ng-popover>
```

Pass the popover's content via attribute `content`:
You can pass raw text or html content.

```html
<div data-pg-ng-popover content="My awesome text or html here"></div>
```

#### Directive Optionals

Choose bottom positioning:

```html
<div data-pg-ng-popover position="bottom" content="My awesome text or html here"></div>
```

You can also choose what event will trigger the popover hide/show:

• Click:
```html
<div data-pg-ng-popover event-type="click" content="My awesome text or html here"></div>
```


#### Transitions

You can transition the hide/show states, but first of all you gotta tell the directive that you are going to transition it so opened class will be added:

```html
<div data-pg-ng-popover transition="true" content="My awesome text or html here"></div>
```

And you can also choose the name of the class that will be added when the popover opens and will be removed when the popover hides (default id `opened`):

```html
<div data-pg-ng-popover opened-class="my-custom-class" transition="true" content="My awesome text or html here"></div>
```

And that's it!

[Rafael Violato](http://rviolato.com) @ [pagar.me](http://pagar.me)