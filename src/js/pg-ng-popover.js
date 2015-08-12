'use strict';

/*

	Developed by Rafael Violato @ pagar.me

*/

(function(){

angular
	.module('pg-ng-popover', [])
	.directive('pgPopover', pgPopover);

	pgPopover.$inject = ['$compile', '$sce'];

	function pgPopover($compile, $sce){

		var directive = {

			scope: {

				eventType: '@',
				openedClass: '@',
				content: '=',

			},

			compile: compile,

		};

		return directive;

		function compile($element, attrs){

			attrs.openedClass = attrs.openedClass || 'opened';

			return {

				post: postLink,

			}
			
		}

		function postLink($scope, $element){

			var popOver;

			popOver = angular.element('<div class="pg-popover" ng-if="isOpened === true" ng-bind-html="content"></div>');
			$element.append($compile(popOver)($scope));

			$scope.content = $sce.trustAsHtml($scope.content);
			$scope.isOpened = false;

			switch($scope.eventType){

				case 'click':

					$element.on('click', click);

				break;

				default:

					$element.on('mouseenter', show);
					$element.on('mouseleave', hide);

			}

			function click(){

				$scope.isOpened ? hide() : show();
				
			}

			function show(){

				$scope.$apply(function(){

					$scope.isOpened = true;
					popOver.addClass($scope.openedClass);
					
				});
				
			}

			function hide(){

				$scope.$apply(function(){

					$scope.isOpened = false;
					popOver.removeClass($scope.openedClass);
					
				});
				
			}
			
		}
		
	}
	
})();