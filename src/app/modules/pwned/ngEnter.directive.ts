module HaveIBeenPwned {
    'use strict';

    export interface IEnterKeyPressAttributes extends ng.IAttributes {
        ngEnter: string
    }

    class EnterKeyPressDirective implements ng.IDirective {

        require = "?ngModel";
        restrict = "A";

        link($scope: ng.IScope, elm: Element, attr: IEnterKeyPressAttributes, ngModel: ng.INgModelController) {
            var element = angular.element(elm);

            element.bind("keydown keypress", (event: JQueryEventObject) => {
                if (event.which === 13) {
                    $scope.$apply(() => {
                        $scope.$eval(attr.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        }

        static instance(): ng.IDirective {
            return new EnterKeyPressDirective();
        }
    }

    angular
        .module("app.pwned")
        .directive("ngEnter", EnterKeyPressDirective.instance);
}