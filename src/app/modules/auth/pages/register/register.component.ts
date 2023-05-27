import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: ['']
    });
  }

  register() {
    if (this.formulario.invalid) {
      // Realiza las acciones necesarias cuando el formulario es inválido
      return;
    }

    const { name, surname, email, password, avatar } = this.formulario.value;

    this.authService.register({ name, surname, email, password, avatar }).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
