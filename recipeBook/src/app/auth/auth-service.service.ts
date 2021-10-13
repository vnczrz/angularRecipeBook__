import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    //kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: string;
    registered?: boolean; //? means its optional field
}

@Injectable({
    providedIn: 'root'
})
export class AuthService  {
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

    //store authenticated user as a subject
    ///idea is that we emit(next) a new user once we login or logout multicasting to all components
    // BehaviorSubject stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject.
    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;
    
    constructor( 
        private http: HttpClient,
        private router: Router
        ){  }
    
    signup( email: string, password: string ){
        //return this prepared observable so we can subscrbe in the auth.component
        return this.http.post<AuthResponseData>( //tell angular what interface you will get in return
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbmLWtPUyQ_v2hQNPSbS92Ys1plCWp3aQ',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        //error handling with rxJS operator
        ///if it returns an erroRes run pipe method with catcherror(handleError)
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                );
            })
        );
    }

    logout() {
        console.log('logged out');
        this.user.next(null);
        this.router.navigate(['/auth']);

        localStorage.removeItem('userData');

        //clear timer when we logout
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;

    }

    ////token timeout, clear session
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
 
    login( email: string, password: string ) {
        ///return obs so we only prepare it here and can subscribe in component
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbmLWtPUyQ_v2hQNPSbS92Ys1plCWp3aQ',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            //step in to obs chain w/o stopping chain w/ tap... and create new User Subject w handleAuthentication func()
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                );
            })
        )
    }

    ///check local storage for  logged in user
    // run this on ngOnInit at root component
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        //create loaded user
        const loadedUser = new User(
                            userData.email,
                            userData.id,
                            userData._token,
                            new Date(userData._tokenExpirationDate)
                        );

        ///check for token & emit as current user
        if(loadedUser.token) {
            this.user.next(loadedUser);
            //set session timeout
            const expirationDuration = 
                new Date(userData._tokenExpirationDate).getTime()
                - new Date().getTime();
            
            this.autoLogout(expirationDuration);
        }

    }

    ///central function to handle auth
    private handleAuthentication(email: string, userID: string, token: string, expiresIn: number) {
        ///wrapping it in date will turn it into date object
        const expirationIn = new Date(
            new Date().getTime() + expiresIn * 1000
        ); //get timestamp in MS and add firebaseexpiratito see when it will expire from the current date
        
        //construct user with resData
        const user = new User(
            email, 
            userID,  
            token, 
            expirationIn)
    
        //.next the user subject and pass the user obj we jsut created so it can be casted as currently logged in user
        this.user.next(user);

        //start autoLogout timer aka session timeout
        this.autoLogout(expiresIn * 1000);

        ///store tokenkey
        localStorage.setItem('userData', JSON.stringify(user));
                
    }

    ///central function to handle error we can pass in to PIPE
    private handleError(errorRes: HttpErrorResponse) {
        ///dive in to errors check it and return error obs
        let errorMessage = 'An Unknown Error Occured' /// default case if we cannot identify error

        //check if error has error message and then nested error field so switch case doesnt break
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage); //wrap errormessage in observablewith throw error
        } 
            switch ( errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email is not found';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage= ' This password is invalid';
                    break;
            } 
            return throwError(errorMessage);
        }

}



// (errorRes => {
//     let errorMessage = 'An Unknown Error Occured' /// default case if we cannot identify error

//     //check if error has error message so switch case doesnt break
//     if(!errorRes.error || !errorRes.error.error){
//         return throwError(errorMessage); //wrap errormessage in observablewith throw error
//     } 
//         switch ( errorRes.error.error.message) {
//             case 'EMAIL_EXISTS':
//                 errorMessage = 'This email already exists!';
//         } 
//         return throwError(errorMessage);
//     }
// )