(function() {
    console.log('Loading weatherService...');
    angular.module('app').factory('weatherService', weatherService);

    weatherService.$inject = ['$http'];

    function weatherService($http) {
        factory.prototype.get = get;

        return new factory();

        function factory() {

        }

        function get(location) {
            var weatherObject = {};
            weatherObject._loading = true;
            var query = escape('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")'),
                url = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";

            console.log(url);

            $http.get(url).then(successCallback, errorCallback).finally(function() {
                weatherObject._loading = false;
            });
            return weatherObject;

            function successCallback(response) {
                console.log(response.data);
                weatherObject.location = response.data.query.results.channel.location;
                weatherObject.condition = {};
                weatherObject.condition.temp = response.data.query.results.channel.item.condition.temp;
                weatherObject.condition.unit = response.data.query.results.channel.units.temperature;
                weatherObject.condition.text = response.data.query.results.channel.item.condition.text;
            }

            function errorCallback(error){
                console.log("Error getting weather: " + error);
            }
        }
    }
})();