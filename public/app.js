angular
	.module('pg-ng-popover-demo', ['pg-ng-popover'])
	.controller('testCtrl', testCtrl);

	function testCtrl($scope){

		$scope.seal = 'That\'s a Seal!';
		$scope.giraffe = 'And that\'s a Giraffe!';
		
	}