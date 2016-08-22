(function(){
	angular.module('app').controller('homeController', homeController);

	homeController.$inject = ['locationService'];
	function homeController(locationService){
		var viewModel = this;
		viewModel.currentLocation = locationService;
		viewModel.getLocationName = getLocationName;
		viewModel.getTemperature = getTemperature;
		viewModel.getConditionsText = getConditionsText;

		function getLocationName() {
            try {
                var string = [];
                if (viewModel.currentLocation.weather.location.city)
                    string.push(viewModel.currentLocation.weather.location.city);
                if (viewModel.currentLocation.weather.location.region)
                    string.push(viewModel.currentLocation.weather.location.region);
                if (viewModel.currentLocation.weather.location.country)
                    string.push(viewModel.currentLocation.weather.location.country);
                return string.join(', ');
            } catch (e) {
                return viewModel.tempLocation;
            }
        }

        function getTemperature() {
            try {
                var string = [];
                if (viewModel.currentLocation.weather.condition.temp)
                    string.push(viewModel.currentLocation.weather.condition.temp);
                if (viewModel.currentLocation.weather.condition.unit)
                    string.push(viewModel.currentLocation.weather.condition.unit);
                return string.join(' ');
            } catch (e) {
                return "";
            }
        }

        function getConditionsText(){
        	try {
                if (viewModel.currentLocation.weather.condition.text)
                    return viewModel.currentLocation.weather.condition.text;
            } catch (e) {
                return "";
            }
        }
	}
})();