'use strict';

/*

	Developed by Rafael Violato @ pagar.me

*/

(function(){

angular
	.module('pg-ng-popover', [])
	.directive('pgPopover', pgPopover);

	pgPopover.$inject = ['$compile', '$sce', '$timeout'];

	function pgPopover($compile, $sce, $timeout){

		var directive = {

			scope: {

				eventType: '@',
				openedClass: '@',
				content: '=',

			},

			compile: compile,
			controller: controller,

		};

		return directive;

		function compile($element, attrs){

			attrs.openedClass = attrs.openedClass || 'opened';

			return {

				post: postLink,

			}
			
		}

		function controller($scope){

			$scope.$watch('content', trustHtml);

			function trustHtml(val){

				if(typeof val === 'string'){

					$scope.popOverContent = $sce.trustAsHtml(val);

				}
				
			}
			
		}

		function postLink($scope, $element){

			var elmTpl = [
							 
							 '<div class="pg-popover"',
							 'ng-if="isOpened === true"',
							 'ng-bind-html="popOverContent"',
							 'ng-style="{\'left\': left + \'px\', \'top\': top + \'px\'}">',
							 '</div>'

						 ].join('');

			var popOver;

			popOver = angular.element(elmTpl);
			$element.append($compile(popOver)($scope));

			$scope.isOpened = false;
			$scope.left = 0;
			$scope.top = 0;

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

					$timeout(function(){

						popOver = angular.element($element[0].querySelector('.pg-popover'));
						popOver.addClass($scope.openedClass);
						position();
						
					});
					
				});
				
			}

			function hide(){

				$scope.$apply(function(){

					popOver.removeClass($scope.openedClass);
					$scope.isOpened = false;
					
				});
				
			}

			function position(){

				var _popOverWidth = popOver.prop('offsetWidth');
				var _popOverHeight = popOver.prop('offsetHeight');
				var _elmWidth = $element.prop('offsetWidth');

				$scope.left = -((_popOverWidth - _elmWidth) / 2);
				$scope.top = -(_popOverHeight + 10);

				console.log($scope.left, _elmWidth, _popOverWidth);
				
			}
			
		}
		
	}
	
})();