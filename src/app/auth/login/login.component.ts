import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
import { login } from "../auth.actions";
import { AuthActions } from "../action-types";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {

    const val = this.form.value;
    var email = val.email;
    var name = email.substring(0, email.lastIndexOf("@"));
    var domain = email.substring(email.lastIndexOf("@") + 1);

    console.log(name); // john.doe
    sessionStorage.setItem('username',name);

    this.auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          console.log(user);

          this.store.dispatch(login({ user }));

          this.router.navigateByUrl("/home");
        })
      )
      .subscribe(noop, () => alert("Login Failed"));
  }
}
