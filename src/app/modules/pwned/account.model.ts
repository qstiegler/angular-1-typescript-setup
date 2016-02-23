module HaveIBeenPwned {
    "use strict";
    
    export class BreachedAccount {
        Title: string;
        Name: string;
        Domain: string;
        BreachDate: string;
        AddedDate: string;
        PwnCount: number;
        Description: string;
        DataClasses: string[];
        IsVerified: boolean;
        LogoType: string;
    }
}