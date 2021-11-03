import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/services/token.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formValidator: FormGroup
  WARNING_EMPTY: string = 'cannot be empty'
  isLogin = true
  isLoading = false

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private formBuilder: FormBuilder, private userService: UserServiceService, private snackBar: MatSnackBar, private tokenService: TokenService) {
    this.formValidator = this.formBuilder.group({
      username: [ {value: '', disabled: true} , [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
      ]]
    })
  }

  get username() {
    return this.formValidator.get('username')
  }

  get email() {
    return this.formValidator.get('email')
  }

  get password() {
    return this.formValidator.get('password')
  }

  onSubmit(form: FormGroupDirective) {
    this.isLoading = true
    if (this.isLogin) {
      this.userService.login(form.value).subscribe((res) =>{
        this.tokenService.setLogin(res.token, res.refreshToken)
        this.isLoading = false
        this.dialogRef.close()
      },
      err => {
        this.callSnackbar(err.error.error.toString())
        this.isLoading = false
      })
    }
    else {
      this.userService.register(form.value).subscribe(res => {
        this.callSnackbar("Registration is successful, you can login")
        this.isLoading = false
        this.isLoginClick()
      },
      err => {
        this.callSnackbar(err.error.error.toString())
        this.isLoading = false
      })
    }
  }

  callSnackbar(message: string) {
    this.snackBar.open(message, undefined, {duration: 3000})
  }

  isLoginClick() {
    this.isLogin = !this.isLogin
    
    if (this.isLogin) {
      this.formValidator.get('username')?.disable()
    }
    else {
      this.formValidator.get('username')?.enable()
    }
    this.formValidator.reset()
  }
}
