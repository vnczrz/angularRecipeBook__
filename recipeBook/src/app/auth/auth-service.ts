import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService  {
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

    constructor( 
        private http: HttpClient,

        ){}
    
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
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An Unknown Error Occured' /// default case if we cannot identify error

            //check if error has error message so switch case doesnt break
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage); //wrap errormessage in observablewith throw error
            } 
                switch ( errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists!';
                } 
                return throwError(errorMessage);

            }
        ));

    }
}