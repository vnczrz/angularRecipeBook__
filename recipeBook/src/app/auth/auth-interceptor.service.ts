import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth-service.service";
import { User } from "./user.model";
import { exhaustMap, map, take, tap }  from "rxjs/operators"

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    ///intercept will check for logged in user and intercept all request with auth params
    
    constructor(private authService: AuthService) {}

    ///call on user subject to check if we are authenticated... if authenticated subject will emit current user
    //that behaviousSubject will emit the latest value(user) and begin pipe chain
    //take() to get the latest value(latest user) from that behavior subject
    //exhaustMap() then gets that value and returns the recipes through a .get request
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user
            .pipe(
                take(
                    1
                ),
                exhaustMap(user => {
                    if (!user) {
                        return next.handle(req);
                    }

                    const modifiedReq = req.clone({
                        params : new HttpParams().set('auth', user.token)
                    });
                    return next.handle(modifiedReq);
                })
            );
        }   
}