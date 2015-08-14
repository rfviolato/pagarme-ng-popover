'use strict';

/*

	Developed by Rafael Violato @ pagar.me

*/

(function(){

angular
	.module('pg-ng-popover', [])
	.directive('pgPopover', pgPopover);

	pgPopover.$inject = ['$timeout', '$document'];

	function pgPopover($timeout, $document){

		var directive = {

			scope: {

				eventType: '@',
				openedClass: '@',
				transition: '@',
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
			var isOpened = false;
			var transitionEndEvt = 'transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd';
			var elmTpl = '<div class="pg-popover">' + $scope.content + '</div>';

			popOver = angular.element(elmTpl);

			switch($scope.eventType){

				case 'click':

					$element.on('click', click);

				break;

				default:

					$element.on('mouseenter', show);
					$element.on('mouseleave', hide);

			}

			function click(){

				isOpened ? hide() : show();
				
			}

			function show(){

				if($scope.transition){

					popOver.off(transitionEndEvt);

				}

				$element.append(popOver);
				position();
				isOpened = true;
				popOver.addClass($scope.openedClass);
				
			}

			function hide(){

				if($scope.transition){

					popOver.on(transitionEndEvt, remove);
					popOver.removeClass($scope.openedClass);

				}else{

					popOver.removeClass($scope.openedClass);
					remove();

				}


				function remove(){

					isOpened = false;
					popOver.remove();
					
				}
				
			}

			function position(){

				var _popOverWidth = popOver.prop('offsetWidth');
				var _popOverHeight = popOver.prop('offsetHeight');
				var _elmWidth = $element.prop('offsetWidth');
				var _left = -((_popOverWidth - _elmWidth) / 2);
				var _top = -(_popOverHeight + 10);

				popOver.css({

					top:  _top + 'px',
					left: _left + 'px',

				});
				
			}
			
		}
		
	}
	
})();