import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/core/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    errorMessage = null;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private loginService: LoginService

    ) {
    }

    async ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.compose([
              Validators.required
            ])),
            password: new FormControl('', Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ]))
        });
        this.cdr.detectChanges();
    }

    async login(){
      const username = this.loginForm.value.username;
		  const password = this.loginForm.value.password;
      this.loginService.setParams({
        username,
        password
      });
  
      try {
        const result = await this.loginService.makeRequest();
        if (result.token) {
          this.router.navigate([""]);
        } else {
          console.log("Something went wrong");
        }
      } catch (errors) {
        console.log("errors: ",errors);
        this.errorMessage = errors.faultyRequest.error;
      }
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
    */
    isControlHasError(controlName: string, validationType: string): boolean {
      const control = this.loginForm.controls[controlName];
      if (!control) {
        return false;
      }
      const result =
        control.hasError(validationType) &&
        (control.dirty || control.touched);
      return result;
    }
}