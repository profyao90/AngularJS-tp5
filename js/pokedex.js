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
pokeApp.factory('PokemApi', ['$resource', pokeFactory]);

pokeApp.factory('sharedService', function () {
    var Poke = {
        food: 'Shared service',
        pokemon: {}
    };
    return Poke;
});

pokeApp.controller('researchPokemonCtrl',
 ['$scope', '$log', '$http', 'PokemApi', 
 'sharedService', function ($scope, $log, $http,
     PokemApi, sharedService) {

    $scope.$log = $log;
    $scope.firstName ="pokemon0";
    $scope.lastName = "pokemon1";
    $scope.pokemons = [];
    $scope.pokeSelect = 0;
    $scope.selectedPokeId;

    $scope.appelHttp = function () {
        $http.get('https://pokeapi.co/api/v2/pokedex/1').
        then(function(resultat) {
            $scope.pokemons = resultat.data.pokemon_entries;
        });
    }

    //Au chargement
    $scope.appelHttp();

    $scope.getSelectedPoke = function () {
        if ($scope.pokeSelect != null) {
            $scope.selectedPokeId = $scope.pokeSelect;
            sharedService.pokemon.id = $scope.selectedPokeId;
            $log.info("selected");
        }
    };

}]);
