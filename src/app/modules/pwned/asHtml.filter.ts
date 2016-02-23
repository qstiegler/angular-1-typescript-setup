module HaveIBeenPwned {
    "use strict";

    asHtml.$inject = ["$sce"];

    export function asHtml($sce: ng.ISCEService) {
        return (text: string) => {
            return $sce.trustAsHtml(text);
        }
    }

    angular
        .module("app.pwned")
        .filter("asHtml", asHtml);
}