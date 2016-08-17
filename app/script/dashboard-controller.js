(function() {
    console.log('Loading dashboardController...');
    angular.module('app').controller('dashboardController', dashboardController);

    dashboardController.$inject = ['weatherService'];

    function dashboardController(weatherService) {
        var viewModel = this;
        viewModel.newItem = newItem;

        viewModel.items = [];
        newItem();

        item.prototype.updateLocation = item_updateLocation;
        item.prototype.getLocationName = item_getLocationName;
        item.prototype.getTemperature = item_getTemperature;
        item.prototype.getConditionsText = item_getConditionsText;

        function item() {
            var thisItem = this;
            thisItem.currentLocation = {};
        }

        function item_updateLocation() {
            var thisItem = this;
            thisItem.currentLocation.weather = weatherService.get(thisItem.tempLocation)
        }

        function item_getLocationName() {
            var thisItem = this;
            try {
                var string = [];
                if (thisItem.currentLocation.weather.location.city)
                    string.push(thisItem.currentLocation.weather.location.city);
                if (thisItem.currentLocation.weather.location.region)
                    string.push(thisItem.currentLocation.weather.location.region);
                if (thisItem.currentLocation.weather.location.country)
                    string.push(thisItem.currentLocation.weather.location.country);
                return string.join(', ');
            } catch (e) {
                return thisItem.tempLocation;
            }
        }

        function item_getTemperature() {
        	var thisItem = this;
            try {
                var string = [];
                if (thisItem.currentLocation.weather.condition.temp)
                    string.push(thisItem.currentLocation.weather.condition.temp);
                if (thisItem.currentLocation.weather.condition.unit)
                    string.push(thisItem.currentLocation.weather.condition.unit);
                return string.join(' ');
            } catch (e) {
                return "";
            }
        }

        function item_getConditionsText(){
        	var thisItem = this;
        	try {
                if (thisItem.currentLocation.weather.condition.text)
                    return thisItem.currentLocation.weather.condition.text;
            } catch (e) {
                return "";
            }
        }

        //Todo add weather icons

        function newItem() {
            viewModel.items.push(new item());
        }
    }
})();