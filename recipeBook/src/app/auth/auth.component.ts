import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //prop to switch between register and login
  isLoginMode = false;
  isLoading = false;
  //error handling we will pass to template
  error: string = null;
 

  constructor( private auth: AuthService, private router: Router) { }

  

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    //prepare the signup/login req
    const email = form.value.email;
    const password = form.value.password;

    ///dry...init obs 
    let authObs: Observable<AuthResponseData>;
    
    this.isLoading = true;
    //this.isLoginMode = true;
    
    if (this.isLoginMode){
      //subscribe to prepared obs from service
      authObs = this.auth.login(email, password);
    } 
    else {        
      authObs = this.auth.signup(email, password); 
    }
    
    ///obs subscribe logic
    authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          //navigate to auth state homepage on success
          this.router.navigate(['/recipes']);
        },
        ///we subscribed to errorMessage being emitted as an observable from the auth service
        errorMessage => { 
          console.log(errorMessage)
          this.error = errorMessage
          this.isLoading = false;
        }
    );   


      

    form.reset();
  }

}
