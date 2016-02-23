module HaveIBeenPwned {
    "use strict";

    routes.$inject = ["$routeProvider"];
    function routes($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/pwned/search.html",
                controller: "SearchController"
            })
            .otherwise({
                redirectTo: "/search"
            });
    }

    angular
        .module("app")
        .config(routes);
}