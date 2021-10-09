import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth-service';

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
 

  constructor( private auth: AuthService) { }

  

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    //this.isLoginMode = true;
    if (this.isLoginMode){
      //....
    } else {
        
        this.auth.signup(email, password).subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        }, 
        ///we subscribed to errorMessage being emitted as an observable from the auth service
        errorMessage => { 
          console.log(errorMessage)
          this.error = errorMessage
          this.isLoading = false;
        }
      );
    }


      

    form.reset();
  }

}
