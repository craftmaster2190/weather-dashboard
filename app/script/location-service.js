(function() {
    console.log('Loading locationService...');
    angular.module('app').factory('locationService', locationService);

    locationService.$inject = ['$http', 'weatherService'];

    function locationService($http, weatherService) {
        factory.prototype.refresh = refresh;
        factory.prototype.setLocation = setLocation;
        factory.prototype.getGetIPLocation = getGetIPLocation;

        return new factory();

        function factory() {
            this.refresh();
        }

        function refresh() {
            var location = this;
            location.error = false;
            if (!location.manual) {
                location.manual = false;
                location.cityName = 'Loading...';
                this.getGetIPLocation();
            }
            location.weather = weatherService.get(location.cityName);
            return location;
        }

        function setLocation(location) {
            this.manual = true;
            this.cityName = location;
            this.refresh();
        }

        function getGetIPLocation(){
            var location = this;
            $http.get('//ipinfo.io').then(successCallback);

            function successCallback(response){
                var cityName = [];
                if(response.data.city)
                    cityName.push(response.data.city);
                if(response.data.region)
                    cityName.push(response.data.region);
                if(response.data.country)
                    cityName.push(response.data.country);
                location.setLocation(cityName.join(', '));
            }
        }
    }
})();