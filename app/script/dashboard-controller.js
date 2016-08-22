(function() {
    angular.module('app').controller('dashboardController', dashboardController);

    dashboardController.$inject = ['Logger', '$cookies', '$uibModal', 'weatherService'];

    function dashboardController(Logger, $cookies, $uibModal, weatherService) {
        var viewModel = this;
        viewModel.newItem = newItem;
        viewModel.removeItem = removeItem;
        viewModel.openModal = openModal;

        item.prototype.updateLocation = item_updateLocation;
        item.prototype.getLocationName = item_getLocationName;
        item.prototype.getTemperature = item_getTemperature;
        item.prototype.getConditionsText = item_getConditionsText;

        init();

        function init(){
            Logger.trace("Loading dashboardController...");
        	viewModel.items = [];
            var locationArray = $cookies.getObject('locations');
            Logger.trace('Got locationArray from cookie.', locationArray);
            if(angular.isArray(locationArray)){
                angular.forEach(locationArray, function(value){
                    newItem(value);
                });
            }
            if(viewModel.items.length === 0){
            	newItem();
            }
        }

        function saveLocationsCookie(){
            var cookieArray = [];
            angular.forEach(viewModel.items, function(value, key){
                cookieArray.push(value.tempLocation);
            });
            $cookies.putObject('locations', cookieArray);
        }

        function newItem(location) {
            viewModel.items.push(new item(location));
        }

        function removeItem(index) {
            viewModel.items.splice(index, 1);
        }

        function openModal(item){
        	$uibModal.open({
        		templateUrl: 'partial/dashboard-modal.html',
        		resolve: {
        			item: item
        		}
        	});
        }

        function item(tempLocation) {
            var thisItem = this;
            thisItem.currentLocation = {};
            if(angular.isString(tempLocation)){
                thisItem.tempLocation = tempLocation;
                thisItem.updateLocation(true);
            }
        }

        function item_updateLocation(ignoreCookieUpdate) {
            var thisItem = this;
            if(!ignoreCookieUpdate){
                saveLocationsCookie();
            }
            thisItem.currentLocation.weather = weatherService.get(thisItem.tempLocation);
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
                    string.push(thisItem.currentLocation.weather.condition.temp + String.fromCharCode(176));
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
    }
})();