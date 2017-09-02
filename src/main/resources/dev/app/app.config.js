/**
 * Created by Katarzyna on 2017-07-15.
 */
(function () {
    'use strict';
    angular.module('proshape').config(function ($logProvider){
        $logProvider.debugEnabled(true);
    }).config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
})();
