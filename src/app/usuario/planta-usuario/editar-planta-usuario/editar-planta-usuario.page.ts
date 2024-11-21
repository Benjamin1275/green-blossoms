import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreServicePlantas } from '../../../admin/services/plantas/planta.service'; // Importar el servicio de Firestore
import { FirestoreServiceCategoria } from '../../../admin/services/categorias/categoria.service'; // Importar el servicio de Firestore

@Component({
  selector: 'app-editar-planta-usuario',
  templateUrl: './editar-planta-usuario.page.html',
  styleUrls: ['./editar-planta-usuario.page.scss'],
})
export class EditarPlantaUsuarioPage implements OnInit {

  plantaForm!: FormGroup;
  planta: any = {
    id: 1,
    nombrePlanta: '',
    nombreCientifico: '',
    categoria: 0,
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: 'assets/productos/Zanahoria Nantera.png' // Ruta de la imagen predeterminada
  };
  categorias: any = [];
  id: any = '';
  base64Image: any;

  constructor(
    public restApi: FirestoreServicePlantas, // Usar el servicio de Firestore
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    private restApiC: FirestoreServiceCategoria, // Usar el servicio de Firestore
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    this.getPlanta(this.route.snapshot.params['id']);
    this.getCategory();
    this.plantaForm = this.formBuilder.group({
      "plant_name" : [null, Validators.required],
      'plant_scientific_name' : [null, Validators.required],
      'plant_category' : [null, Validators.required],
      'plant_img' : [null, Validators.required],
      'plant_desc' : [null, Validators.required],
    });
  }

  async getCategory() {
    console.log("Entrando :getCategory");
    const loading = await this.loadingController.create({
      message: 'Cargando Categorias...'
    });
    await loading.present();
    this.restApiC.getCategorias().subscribe({
      next: (res) => { 
        console.log("Res:" + res);
        this.categorias = res;
        console.log("thisCategoria:", this.categorias);
        loading.dismiss();
      },
      complete: () => { },
      error: (err) => {
        console.log("Err:" + err);
        loading.dismiss();
      }
    });
  }

  async getPlanta(id: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.restApi.getPlanta(id + "").subscribe({
      next: (data) => {
        console.log("getProductID data****");
        console.log(data);
        this.id = data.id;
        this.plantaForm.setValue({
          plant_name: data.nombrePlanta,
          plant_scientific_name: data.nombreCientifico,
          plant_category: data.categoria,
          plant_img: data.imagen,
          plant_desc: data.descripcion
        });
        this.planta.imagen = data.imagen; // Actualiza la imagen
        loading.dismiss();
      },
      complete: () => { },
      error: (err) => {
        console.log("getProductID Errr****+");
        console.log(err);
        loading.dismiss();
      }
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.base64Image = reader.result;
        this.plantaForm.patchValue({
          plant_img: this.base64Image
        });
        this.planta.imagen = this.base64Image; // Actualiza la imagen
      };
    }
  }

  async onFormSubmit(form: any) {
    console.log("onFormSubmit ID:" + this.id)
    this.planta.id = this.id;
    this.planta.nombrePlanta = this.plantaForm.value.plant_name;
    this.planta.nombreCientifico = this.plantaForm.value.plant_scientific_name;
    this.planta.categoria = this.plantaForm.value.plant_category;
    this.planta.precio = 0; // Valor predeterminado
    this.planta.stock = 1; // Valor predeterminado
    this.planta.imagen = this.plantaForm.value.plant_img;
    this.planta.descripcion = this.plantaForm.value.plant_desc;

    const loading = await this.loadingController.create({
      message: 'Actualizando...'
    });
    await loading.present();

    try {
      await this.restApi.updatePlanta(this.id, this.planta);
      loading.dismiss();
      this.router.navigate(['planta-usuario']);
    } catch (err) {
      console.log(err);
      loading.dismiss();
    }
  }
}