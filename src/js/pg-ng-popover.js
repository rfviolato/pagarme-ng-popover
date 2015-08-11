angular
	.module('pg-ng-popover', [])
	.directive('pgPopover', pgPopover);

	function pgPopover(){

		var directive = {

			scope: {

				eventType: '@', 

			},

			compile: compile,

		};

		return directive;

		function compile($element, attrs){

			attrs.eventType = attrs.eventType || 'hover';

			return {

				post: postLink,

			}
			
		}

		function postLink($scope, $element){

			if($scope.eventType === 'hover') {

				$element.on('mouseenter', mouseenter);
				$element.on('mouseleave', mouseleave);

			} else if($scope.eventType === 'click') {

				$element.on('mouseleave', click);

			}

			function mouseenter(){
				
			}

			function mouseleave(){
				
			}

			function click(){
				
			}
			
		}
		
	}