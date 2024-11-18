import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private alertController: AlertController) {
    // Inicialización del formulario
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  // Método que se llama al hacer clic en el botón Ingresar
  async ingresar() {
    if (this.formularioLogin.valid) {
      const formData = this.formularioLogin.value;
      console.log('Correo:', formData.correo);
      console.log('Contraseña:', formData.password);

      // Validación de credenciales
      if (formData.correo === 'usuario@gmail.com' && formData.password === '123') {
        this.router.navigate(['/home']);
      } else if (formData.correo === 'admin@gmail.com' && formData.password === '123') {
        this.router.navigate(['/admin']);
      } else {
        console.log('usuario@gmail.com 123 para home o admin@gmail.com 123 para admin');
        // Muestra un alert con el mensaje de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Credenciales incorrectas',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      console.log('El formulario no es válido');
    }
  }
}