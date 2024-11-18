import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServicePlantas } from '../../../admin/services/plantas/planta.service'; // Importar el servicio de Firestore
import { FirestoreServiceCategoria } from '../../../admin/services/categorias/categoria.service'; // Importar el servicio de Firestore
import { Location } from '@angular/common'; // Importa el servicio Location correctamente

@Component({
  selector: 'app-agregar-planta-usuario',
  templateUrl: './agregar-planta-usuario.page.html',
  styleUrls: ['./agregar-planta-usuario.page.scss'],
})
export class AgregarPlantaUsuarioPage implements OnInit {
  plantaForm!: FormGroup;
  planta: any = {
    id: Math.floor(Math.random() * 1000),
    nombrePlanta: '',
    nombreCientifico: '',
    categoria: 0,
    precio: 0,
    stock: 0,
    imagen: '',
    descripcion: ''
  };

  categorias: any = [];
  base64Image: string | ArrayBuffer | null = '';

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApiPlantas: FirestoreServicePlantas,
    private restApiCategorias: FirestoreServiceCategoria,
    private router: Router,
    public toastController: ToastController,
    private location: Location // Inyecta el servicio Location
  ) { }

  ngOnInit() {
    this.getCategorias();
    this.plantaForm = this.formBuilder.group({
      'nombrePlanta': [null, [Validators.required, Validators.maxLength(50), this.noSpecialCharsValidator]],
      'nombreCientifico': [null, [Validators.required, Validators.maxLength(50), this.noSpecialCharsValidator]],
      'categoria': [null, Validators.required],
      'imagen': [null, Validators.required],
      'descripcion': [null, [Validators.required, Validators.maxLength(200), this.noSpecialCharsValidator]]
    });

    this.plantaForm.get('nombrePlanta')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('nombrePlanta');
    });

    this.plantaForm.get('nombreCientifico')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('nombreCientifico');
    });

    this.plantaForm.get('descripcion')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('descripcion');
    });
  }

  noSpecialCharsValidator(control: FormControl) {
    const forbiddenChars = /[#$%&!"°|/()='?¿¡´+{}¨*;,><]/;
    const hasForbiddenChars = forbiddenChars.test(control.value);
    return hasForbiddenChars ? { 'forbiddenChars': { value: control.value } } : null;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  checkFieldErrors(field: string) {
    const control = this.plantaForm.get(field);
    if (control?.hasError('forbiddenChars')) {
      this.presentToast(`El ${field} no debe contener caracteres especiales como #$%&!"°|/()='?¿¡´+{}¨*;,><.`, 'danger');
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.base64Image = reader.result;
        this.plantaForm.patchValue({
          imagen: this.base64Image
        });
      };
    }
  }

  async onFormSubmit() {
    if (this.plantaForm.invalid) {
      this.checkFieldErrors('nombrePlanta');
      this.checkFieldErrors('nombreCientifico');
      this.checkFieldErrors('descripcion');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    // Actualiza el objeto planta con los valores del formulario y asigna valores predeterminados a precio y stock
    this.planta = {
      ...this.plantaForm.value,
      precio: 100, // Valor predeterminado para precio
      stock: 10 // Valor predeterminado para stock
    };

    this.restApiPlantas.addPlanta(this.planta)
      .subscribe({
        next: async () => {
          console.log("Next addPlanta Page");
          loading.dismiss();
          console.log("Next agrego, Data Not Null, actualizando lista de plantas");

          // Navegar a la página de plantas
          this.router.navigateByUrl('/planta-usuario');

          // Mostrar mensaje de confirmación
          this.presentToast('Planta agregada correctamente.', 'success');
        },
        error: async (error_msg: any) => {
          console.log("Error addPlanta Page", error_msg);
          loading.dismiss();
          // Mostrar mensaje de error
          this.presentToast('Error al agregar la planta.', 'danger');

          // Redirigir a la página de plantas incluso si hay un error
          this.router.navigateByUrl('/planta-usuario'); // Navegar a la página de plantas
        }
      });
    console.log("Fin de la ejecución del método onFormSubmit");
  }

  async getCategorias() {
    console.log("Prueba: getCategorias");
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.restApiCategorias.getCategorias()
      .subscribe({
        next: (data: any) => {
          this.categorias = data;
          console.log("Categorias", this.categorias);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg: any) => {
          console.log("Error getCategorias Page", error_msg);
          loading.dismiss();
        }
      });
  }
}