import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequest} from './signupRequest';
import {AuthService} from '../auth/shared/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {
  signupRequest: SignupRequest;
  signUpForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService,
              private router: Router,
              private popup: MatSnackBar) {
    this.signupRequest =
      {
        username: '',
        email: '',
        password: ''
      };
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email),
        password: new FormControl('', Validators.minLength(6)),
      }
    );
  }

  signup(): void {
    this.signupRequest.email = this.signUpForm.get('email').value;
    this.signupRequest.username = this.signUpForm.get('username').value;
    this.signupRequest.password = this.signUpForm.get('password').value;
    this.authService.signup(this.signupRequest)
      .subscribe( data =>
        {
          if (data.toString() === 'Registration Successful'){
            this.router.navigate(['/login'],
            {queryParams: { registered: 'true'} }
            );
          }
          else{
            this.popup.open(data.toString(), ' ', {
              duration: 1500,
              panelClass: ['mat-toolbar', 'mat-warn']
            } );
            console.log(data);
            }
        }, () =>
      {
        this.popup.open('Oops Connectivity Issue', '' , {
          duration: 1500,
          panelClass: ['mat-toolbar', 'mat-warn']
        } );
      });
  }
}
