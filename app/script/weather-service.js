(function() {
    angular.module('app').factory('weatherService', weatherService);

    weatherService.$inject = ['$http', 'Logger'];

    function weatherService($http, Logger) {
        factory.prototype.get = get;

        Logger.trace("Starting new weatherService...");

        return new factory();

        function factory() {

        }

        function get(location) {
            var weatherObject = {};
            weatherObject._loading = true;
            var query = escape('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")'),
                url = "//query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
            
            Logger.debug("Checking weather at location", location);

            $http.get(url).then(successCallback, errorCallback).finally(function() {
                weatherObject._loading = false;
            });
            return weatherObject;

            function successCallback(response) {
                Logger.trace("Received a weather response", response);
                try {
                    weatherObject.location = response.data.query.results.channel.location;
                    weatherObject.condition = {};
                    weatherObject.condition.temp = response.data.query.results.channel.item.condition.temp;
                    weatherObject.condition.unit = response.data.query.results.channel.units.temperature;
                    weatherObject.condition.text = response.data.query.results.channel.item.condition.text;
                } catch (e) {
                    errorCallback(e);
                }
            }

            function errorCallback(error) {
                Logger.error("Error getting weather", error);
            }
        }
    }
})();