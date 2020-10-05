import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Loginrequest} from './loginrequest';
import {AuthService} from '../auth/shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 loginForm: FormGroup;
  hide = true;
  loginrequest: Loginrequest;
  private isError: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private popUp: MatSnackBar ) {
    this.loginrequest =
      {
        username: '',
        password: ''
      };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.minLength(6)),
      });
    this.activatedRoute.queryParams.subscribe(params =>
      {
        if ( params.registered !== undefined && params.registered === 'true' )
        {
        }
      }
    );
  }
  login(): void
  {
    this.loginrequest.username = this.loginForm.get('username').value;
    this.loginrequest.password = this.loginForm.get('password').value;
    this.authService.login(this.loginrequest)
      .subscribe(data => {
        if ( data.length === 0 ) {
          this.isError = false;
          this.popUp.open('Logged In Successfully', '',
            {
              duration: 1000
            } );
          this.router.navigateByUrl('/');
        } else {
          this.isError = true;
          this.popUp.open('UserName or Password Incorrect', '',
            {
              duration: 1000
            } );
        }
      }, () =>
      { this.popUp.open('Interent Not Stable', '',
        {
          duration: 1000
        } );
      }
      );
  }

}
