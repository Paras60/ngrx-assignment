import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AppState} from '../../reducers';
import {login} from '../auth.actions';
import {AuthActions} from '../action-types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['test@gmail.com', [Validators.required]],
          password: ['test@123', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {

      const val = this.form.value;
      console.log(val.email, val.password);
      if(val.email == 'test@gmail.com' && val.password == 'test@123'){
        console.log(val.email, val.password);
          this.router.navigate(["courses"]);
         }
  }

}

