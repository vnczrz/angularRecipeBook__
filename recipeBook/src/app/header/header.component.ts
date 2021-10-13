import { ThrowStmt } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth-service.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    
    collapsed = true;
    isAuthenticated = false;

    constructor(private dataStorageService: DataStorageService, private auth: AuthService) {}

    ngOnInit() {
        //subscribe to user subject to get the auth status 
        this.userSub = this.auth.user.subscribe(
            user => {
                this.isAuthenticated = !user ? false : true; 
            }
        ); 
    }



    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout() {
        console.log('logged out');
        this.auth.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}