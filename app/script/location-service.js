(function() {
    angular.module('app').factory('locationService', locationService);

    locationService.$inject = ['$http', 'weatherService', '$cookies', '$geolocation', "Logger"];

    function locationService($http, weatherService, $cookies, $geolocation, Logger) {
        factory.prototype.refresh = refresh;
        factory.prototype.setLocation = setLocation;
        factory.prototype.initAutomaticGetLocation = initAutomaticGetLocation;

        Logger.trace("Starting new locationService...");

        return new factory();

        function factory() {
            this.refresh();
        }

        function refresh() {
            var that = this;
            that.error = false;
            if (!that.manual) {
                that.manual = false;
                that.cityName = 'Loading...';
                this.initAutomaticGetLocation();
            }
            that.weather = weatherService.get(that.cityName);
            return that;
        }

        function setLocation(location) {
            this.manual = true;
            this.cityName = location;
            this.refresh();
        }

        function initAutomaticGetLocation() {
            var that = this;
            var cookieCityName = $cookies.get('cityName');
            if (cookieCityName) {
                that.setLocation(cookieCityName);
                Logger.debug("Got cityname(" + cookieCityName + ") from cookie.");
            } else {
                tryGeolocation();
                tryIPLocation();
            }

            function tryGeolocation() {
                Logger.debug("Trying geolocation for global position");
                $geolocation.getCurrentPosition({
                    timeout: 0
                }).then(function(position) {
                    setPosition(position);
                }, function(error){
                    Logger.error('Unable to get geolocation.', error);
                });
            }

            function setPosition(position){
                Logger.debug("Got position(" + position + ") from geolocation");
            }

            function tryIPLocation() {
                Logger.debug("Querying ipinfo.io for city name...");
                $http.get('//ipinfo.io').then(ipinfoSuccessCallback);
            }

            function ipinfoSuccessCallback(response) {
                var cityName = [];
                if (response.data.city)
                    cityName.push(response.data.city);
                if (response.data.region)
                    cityName.push(response.data.region);
                if (response.data.country)
                    cityName.push(response.data.country);
                cityName = cityName.join(', ');
                Logger.debug("Got cityname(" + cookieCityName + ") from ipinfo.io");
                $cookies.put('cityName', cityName);
                that.setLocation(cityName);
            }
        }
    }
})();