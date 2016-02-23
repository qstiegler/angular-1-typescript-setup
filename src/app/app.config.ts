module HaveIBeenPwned {
    "use strict";

    function appConfig($locationProvider: ng.ILocationProvider) {
        $locationProvider.html5Mode(true);
    }

    appConfig.$inject = ["$locationProvider"];

    angular
        .module("app")
        .config(appConfig);
}