/**
 * Created by Katarzyna on 2017-08-27.
 */
(function () {
    'use strict';

    angular
        .module('proshape.rank')
        .controller('RankController', RankController);

    RankController.$inject = [];

    /* @ngInject */
    function RankController() {
        var vm = this;
        vm.title = 'RankController';
        vm.temp = "Temp";

        activate();

        ////////////////

        function activate() {

        }
    }

})();

