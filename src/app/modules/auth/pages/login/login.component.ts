import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,

  ) {
    this.initForm();
  }
  ngOnInit(): void {
    console.log(this.authService.user);
  }



  initForm() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formulario.valid) {
      const { email, password } = this.formulario.value;

      this.authService.login(email, password).subscribe((resp: any) => {
        console.log(resp);
        if (!resp.error && resp) {
          this.router.navigate(["/"]);
        }
      });
    } else {
      alert("Por favor, complete todos los campos requeridos");
    }
  }
}
