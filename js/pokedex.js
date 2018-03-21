var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeFactory = function ($resource) {
    return $resource('https://pokeapi.co/api/v2/pokemon/:id/', {id: '@id'},
        {
            'update': {method: 'PUT'},
        });
};