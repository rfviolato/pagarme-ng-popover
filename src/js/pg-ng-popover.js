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

			var popoverElm = angular.element('<div class="pg-popover" ng-if="isOpened === true"></div>');

			$element.append(popoverElm);
			$compile(popoverElm)($scope);

			$scope.isOpened = false;

			if($scope.eventType === 'hover') {

				$element.on('mouseenter', mouseenter);
				$element.on('mouseleave', mouseleave);

			} else if($scope.eventType === 'click') {

				$element.on('mouseleave', click);

			}

			function mouseenter(){

				$scope.$apply(function(){

					$scope.isOpened = true;
					
				});
				
			}

			function mouseleave(){

				$scope.$apply(function(){

					$scope.isOpened = false;
					
				});
				
			}

			function click(){
				
			}
			
		}
		
	}