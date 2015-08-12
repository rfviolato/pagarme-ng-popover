angular
	.module('pg-ng-popover', [])
	.directive('pgPopover', pgPopover);

	pgPopover.$inject = ['$compile'];

	function pgPopover($compile){

		var directive = {

			scope: {

				eventType: '@',
				openedClass: '@',

			},

			compile: compile,

		};

		return directive;

		function compile($element, attrs){

			attrs.eventType = attrs.eventType || 'hover';
			attrs.openedClass = attrs.openedClass || 'opened';

			return {

				post: postLink,

			}
			
		}

		function postLink($scope, $element){

			var popOver = angular.element('<div class="pg-popover" ng-if="isOpened === true"></div>');

			$element.append(popOver);
			$compile(popOver)($scope);

			$scope.isOpened = false;

			switch($scope.eventType){

				case 'hover':

					$element.on('mouseenter', show);
					$element.on('mouseleave', hide);				

				break;

				case 'click':

					$element.on('click', click);

				break;

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