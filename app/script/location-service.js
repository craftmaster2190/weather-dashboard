(function() {
    console.log('Loading locationService...');
    angular.module('app').factory('locationService', locationService);

    locationService.$inject = ['weatherService'];

    function locationService(weatherService) {
        factory.prototype.refresh = refresh;
        factory.prototype.setLocation = setLocation;

        return new factory();

        function factory() {
            this.refresh();
        }

        function refresh() {
            var location = this;
            location.error = false;
            if (!location.manual) {
                location.manual = false;
                //TODO Add Geolocation
                location.cityName = 'Salt Lake City, UT';
            }
            location.weather = weatherService.get(location.cityName);
            return location;
        }

        function setLocation(location) {
            this.manual = true;
            this.cityName = location;
            this.refresh();
        }
    }
})();