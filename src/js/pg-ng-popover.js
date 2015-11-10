'use strict';

/*

	Developed by Rafael Violato @ pagar.me

*/

(function(){

angular
	.module('pg-ng-popover', ['ngAnimate'])
	.directive('pgPopover', pgPopover);

	pgPopover.$inject = ['$timeout', '$document', '$animate'];

	function pgPopover($timeout, $document, $animate){
		var directive = {
			scope: {
				eventType: '@',
				openedClass: '@',
				transition: '@',
				position: '@',
				content: '=',
			},
			compile: compile,
		};

		return directive;

		function compile($element, attrs){
			attrs.openedClass = attrs.openedClass || 'opened';

			return {
				post: postLink,
			};
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

			switch($scope.position){
				case 'bottom':
					popOver.addClass('arrow-up');
				break;

				default:
					popOver.addClass('arrow-down');

			}

			function click(){
				isOpened ? hide() : show();
			}

			function show(){
				if($scope.transition == 'true'){
					popOver.off(transitionEndEvt);
					append();
					popOver.addClass($scope.openedClass);
				}else{
					append();
				}

				function append(){
					$element.append(popOver);
					position();
					isOpened = true;
				}
				
			}

			function hide(){
				if($scope.transition == 'true'){
					popOver.on(transitionEndEvt, remove);
					popOver.removeClass($scope.openedClass);
				}else{
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
				var _vert = -((_popOverWidth - _elmWidth) / 2);
				var _horz;
				var _elmHeight

				if($scope.position === 'bottom'){
					_elmHeight = $element.prop('offsetHeight');
					_horz = (_popOverHeight + _elmHeight - 10);
				}else{
					_horz = -(_popOverHeight + 10);
				}

				popOver.css({
					top:  _horz + 'px',
					left: _vert + 'px',
				});
			}
		}
	}
})();