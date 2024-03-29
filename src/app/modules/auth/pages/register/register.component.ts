import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
declare function alertDanger([]): any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  email: string = "";
  name: string = "";
  surname: string = "";
  password: string = "";
  repet_password: string = "";
  constructor(
    public authServices: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authServices.user) {
      // this.router.navigate(["/"]);
    }
  }

  registro() {

    if (!this.email ||
      !this.name ||
      !this.surname ||
      !this.password ||
      !this.repet_password) {
      alertDanger("TODOS LOS CAMPOS SON REQUERIDOS");
    }
    if (this.password != this.repet_password) {
      alertDanger("LAS CONTRASEÑAS DEBEN SER IGUALES");
    }
    let data = {
      email: this.email,
      name: this.name,
      surname: this.surname,
      password: this.password,
      rol: 'user',
    };
    this.authServices.register(data).subscribe((resp: any) => {
      console.log(resp);
    });
  }

}
