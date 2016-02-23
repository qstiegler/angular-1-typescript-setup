module HaveIBeenPwned {
    "use strict";

    export interface IPwnedService {
		check(address:string): ng.IPromise<ng.IHttpPromiseCallbackArg<BreachedAccount[]>>;
    }

    class PwnedService implements IPwnedService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
            console.log('in service');
        }

        check(address: string): ng.IPromise<ng.IHttpPromiseCallbackArg<BreachedAccount[]>> {
            return this.$http.get("https://haveibeenpwned.com/api/v2/breachedaccount/" + address);
        }
    }

    angular
        .module("app.pwned")
        .service("PwnedService", PwnedService);
}