angular
	.module('pg-ng-popover-demo', ['pg-ng-popover'])
	.controller('testCtrl', testCtrl);

	function testCtrl($scope){

		$scope.testBinding = 'Testando o Popover';
		
	}