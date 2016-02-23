/// <reference path="../../typings/tsd.d.ts" />

module HaveIBeenPwned {
    "use strict";

    angular
        .module("app", [
            "ngRoute",
            "app.pwned"
        ]);
}