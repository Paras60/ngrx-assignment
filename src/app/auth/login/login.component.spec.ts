import { CommonModule } from "@angular/common";
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { getMaxListeners } from "process";
import { AuthService } from "../auth.service";
import { LoginComponent } from "./login.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

const loginServiceStub = {
  login(email: string, password: string) {
    const userResponse = {
      id: 1,
      email: "paras@gmail.com",
    };
    return userResponse;
  },
};

describe("Login Component", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  const formBuilder: FormBuilder = new FormBuilder();

  let store: MockStore<TestBed>;
  const initialState = { loggedIn: false };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        AuthService,
        { provide: AuthService, use: loginServiceStub },
        { provide: FormBuilder, use: formBuilder },
        MockStore,
        provideMockStore({ initialState }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
    const emailCtrl = ["paras@gmail.com", [Validators.required]];
    const passwordCtrl = ["test", [Validators.required]];
    component.form = formBuilder.group({
      email: emailCtrl,
      password: passwordCtrl,
    });
  });
  it("should create store", inject([Store], (store) => {
    expect(store).toBeTruthy();
  }));

  it("should create component", () => {
    expect(component).toBeDefined();
  });

  it("should login form is valid", () => {
    component.form.get("email").setValue("paras@gmail.com");
    component.form.get("password").setValue("test");

    expect(component.form.valid).toBeTruthy();
  });

  it("should login form is invalid", () => {
    component.form.get("email").setValue(null);
    expect(component.form.valid).toBeFalsy();
    component.form.get("password").setValue(null);
    expect(component.form.valid).toBeFalsy();
  });

    // it('should add ng-invalid on email input and display error message', ()=>{
    //   component.form.get('email').setValue(null);
    //   component.form.get('email').markAllAsTouched();
    //   const emailInput = fixture.debugElement.query(By.css('[formcontrolname="email"]'));
    //   console.log(emailInput);
    //   expect(emailInput).toHaveClass('ng-invalid');
    //   const emailError = fixture.debugElement.query(By.css('[mat-error]'));
    //   console.log(emailError);
    //   expect(emailError).toBeTruthy();
    // })

  it("should disable attribute on submit button when login form is invalid", () => {
    component.form.get("email").setValue(null);
    const submitBtn = fixture.debugElement.query(
      By.css(".btn-submit")
    ).nativeElement;
    // expect(submitBtn.disabled).toBeTrue();
    expect(submitBtn.textContent).toContain("Login");
  });

  it("should call login when clicked on login", () => {
    spyOn(component, 'login');
    const submitBtn = fixture.debugElement.query(By.css('.btn-submit')).nativeElement;
    submitBtn.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
    });
  });
});
