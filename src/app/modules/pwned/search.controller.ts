module HaveIBeenPwned {
    "use strict";

    interface ISearchController {
        //submit(address: string): void
    }

    interface ISearchControllerScope extends ng.IScope {
        vm: ISearchController
    }

    class SearchController implements ISearchController {

        static $inject = ["$scope", "PwnedService"];
        constructor($scope: ISearchControllerScope, private pwnedService: IPwnedService) {
            $scope.vm = this;
            console.log('in controller');
        }

        private breachedAccounts: BreachedAccount[];

        submit(address: string) {
            this.pwnedService.check(address)
                .then((result: ng.IHttpPromiseCallbackArg<BreachedAccount[]>) => {
                    this.breachedAccounts = result.data;
                })
                .catch((reason: any) => {
                    alert(reason.Message || reason.message);
                });
        }
    }

    angular
       .module("app.pwned")
       .controller("SearchController", SearchController);
}