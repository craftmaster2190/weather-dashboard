(function() {
    console.log('Loading currentLocationController...');
    angular.module('app').controller('currentLocationController', currentLocationController);

    currentLocationController.$inject = ['locationService'];

    function currentLocationController(locationService) {
        var viewModel = this;
        viewModel.currentLocation = locationService;
        console.log(viewModel.currentLocation);
    }
})();