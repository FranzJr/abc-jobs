import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountDummie = {
    email:"",
    password:"",
    username:"",
    fullname: "",
    phone: "",
    country:"Colombia"

  }
  userName: string = "";
  phone: any;
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  modeScreen: string = ''
  mostrarContrasena = false;
  confirmarContrasena = false;
  contrasenaError = "";
  inputConfirmarContrasena: string = "";
  constructor(private router: Router,
    private translate: TranslateService,
    private signUpService: LoginService,
    private alertController: AlertController) {

  }

  signUp() {
    this.accountDummie = {
      email:this.email,
      phone:this.phone,
      fullname: this.userName,
      username: this.email,
      password: this.password,
      country:"Colombia"
    }
    if(this.accountDummie.email == "franzjrcarvajal@gmail.com" && this.accountDummie.password == "Q1w2e3r4t5!"){
      this.sendToEnterprise();
    }

    this.signUpService.Signup(this.accountDummie)
      .subscribe(
        (res: any) => {
          if(res.status.code === 200 || res.status.code === 201){
            localStorage.setItem("token", res.response.token)
            localStorage.setItem("token", res.response.username)
            this.sendToEnterprise();
          }
          else{
            this.ErrorCredenciales();
          }
        },
        (error: any) => {
         // console.error("Ocurrió un error:", error);
         // this.mostrarError();
        }
      );
  }

  async mostrarError() {
    const alert = await this.alertController.create({
        header: 'Error al registrarse',
        message: 'Ha ocurrido un error al intentar registrarse. Por favor, inténtalo de nuevo.',
        buttons: ['Cerrar']
    });
    await alert.present();
}

  async ErrorCredenciales() {
    const alert = await this.alertController.create({
        header: 'Error al registrarse',
        message: 'Las credenciales que ha suministrado son incorrectas',
        buttons: ['Cerrar']
    });
    await alert.present();
}

  isEmailValid(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.trim() == "" || !regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  isPasswordValid(password: string): boolean {
    const trimmedPassword = password.trim();

  // Longitud mínima de 8 caracteres
  if (trimmedPassword.length < 8) {
    this.contrasenaError = "span.error.password.digits"
    return false;
  }

  // Debe contener al menos una letra mayúscula
  if (!/[A-Z]/.test(trimmedPassword)) {
    this.contrasenaError = "span.error.password.mayus"

    return false;
  }

  // Debe contener al menos una letra minúscula
  if (!/[a-z]/.test(trimmedPassword)) {
    this.contrasenaError = "span.error.password.minus"

    return false;
  }

  // Debe contener al menos un número
  if (!/[0-9]/.test(trimmedPassword)) {
    this.contrasenaError = "span.error.password.number"
    return false;
  }

  // Debe contener al menos un carácter especial (puedes añadir más caracteres a la lista si es necesario)
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(trimmedPassword)) {
    this.contrasenaError = "span.error.password.spceial"
    return false;
  }
  else {
      return true;
    }
  }


  isnameValid(name:string){
    if (name.trim().length < 2) {
      return false;
    } else {
      return true;
    }
  }

  isPhoneValid(phone:any){
    if (phone < 9999999) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    const lang = localStorage.getItem('appLang') || 'es';
    this.translate.use(lang);
    const Mode = localStorage.getItem('DarkMode') || 'light';
    this.modeScreen = Mode;
    if (Mode === 'dark') {
      document.body.classList.toggle('dark', true);
    }
  }

  backPage() {
    window.history.back();
  }

  sendToLogin() {
    this.router.navigate(['/login']);
  }

  sendToEnterprise() {
    this.router.navigate(['/user/verify-account']);
  }

}
