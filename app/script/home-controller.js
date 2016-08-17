(function(){
	console.log('Loading homeController...');
	angular.module('app').controller('homeController', homeController);

	homeController.$inject = ['locationService'];
	function homeController(locationService){
		var viewModel = this;
		viewModel.currentLocation = locationService;
	}
})();