/**
 * Created by Katarzyna on 2017-07-15.
 */
(function () {
    'use strict';
    angular.module('proshape')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "/proshape/app/home.html"
            })
            .when("/rank", {
                templateUrl : "/proshape/app/rank/rank.html",
                controller: 'RankController',
                controllerAs: 'rankCtrl'
            })
            .when("/categories", {
                templateUrl : "/app/categories/categories.html"
            })
            .when("/groups", {
                templateUrl : "/proshape/app/groups/groups.html"
            }).otherwise({ redirectTo: '/'});

    }
})();

