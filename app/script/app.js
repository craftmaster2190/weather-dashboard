(function() {
    angular.module('app', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngGeolocation'])
        .constant('moment', moment)
        .config(configureRouter)
        .config(configureCookies)
        .run(configureLogger);
    configureRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configureRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        var states = ['home', 'dashboard'];
        for (var i = states.length - 1; i >= 0; i--) {
            $stateProvider
                .state(states[i], {
                    url: '/' + states[i],
                    templateUrl: 'partial/' + states[i] + '.html',
                    controller: states[i] + 'Controller',
                    controllerAs: 'ctrl'
                });
        }
    }

    configureCookies.$inject = ['$cookiesProvider'];
    function configureCookies($cookiesProvider){
        $cookiesProvider.defaults.expires = getHoursFromNow(4);
    }

    function getHoursFromNow(hours){
        return new Date(new Date().getTime() + hours * 60 * 60 * 1000);
    }

    configureLogger.$inject = ['Logger', '$location'];
    function configureLogger(Logger, $location){
        var logging = $location.search().logging;
        if(canBeNumber(logging)){
            Logger.setVerbosity(parseInt(logging));
        }else if(angular.isString(logging)){
            logging = logging.toUpperCase();
            Logger.setVerbosity(Logger.Level[logging]);
        }else{
            Logger.setVerbosity(Logger.Level.OFF);
        }
    }

    function canBeNumber(stringOfNumber){
        /* Note the type juggling */
        return stringOfNumber - 0 == stringOfNumber;
    }
})();