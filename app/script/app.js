(function() {
	console.log('Loading app...');
    angular.module('app', ['ui.bootstrap', 'ui.router']);
    angular.module('app').config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
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
})();