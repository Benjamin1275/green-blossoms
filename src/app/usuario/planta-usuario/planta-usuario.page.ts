import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { FirestoreServicePlantas } from 'src/app/admin/services/plantas/planta.service'; // Importar el servicio de Firestore
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VisualizarPlantaComponent } from 'src/app/admin/productos/modal-planta/visualizar-planta.component'; // Importar el componente

@Component({
  selector: 'app-planta-usuario',
  templateUrl: './planta-usuario.page.html',
  styleUrls: ['./planta-usuario.page.scss'],
})
export class PlantaUsuarioPage implements OnInit, OnDestroy {

  plantas: any[] = [];
  filteredPlantas: any[] = [];
  searchTerm: string = '';
  isViewing: boolean = false; // Flag para evitar llamadas múltiples

  constructor(
    public restApi: FirestoreServicePlantas,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getPlantas();
  }

  ngOnDestroy() {
    // Cerrar cualquier instancia abierta de SweetAlert al destruir el componente
  }

  async getPlantas() {
    console.log("Entrando :getPlanta");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando plantas...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    this.restApi.getPlantas().subscribe({
      next: (res) => {
        console.log("Res:", res);
        // Si funciona asigno el resultado al arreglo plantas
        this.plantas = res;
        this.filteredPlantas = [...this.plantas]; // Inicializa las plantas filtradas
        console.log("thisPlantas:", this.plantas);
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        // Si da error, imprimo en consola.
        console.log("Err:", err);
        loading.dismiss();
      }
    });
  }

  async viewPlanta(id: string) {
    if (this.isViewing) return; // Evitar llamadas múltiples
    this.isViewing = true;
    console.log('Iniciando viewPlanta');

    const loading = await this.loadingController.create({
      message: 'Cargando detalles de la planta...'
    });
    await loading.present();

    this.restApi.getPlanta(id).subscribe({
      next: async (planta) => {
        const modal = await this.modalController.create({
          component: VisualizarPlantaComponent,
          componentProps: { planta }
        });
        await modal.present();
        loading.dismiss();
        this.isViewing = false; // Resetear el flag
      },
      error: (error) => {
        console.error('Error al cargar detalles de la planta', error);
        loading.dismiss();
        this.isViewing = false; // Resetear el flag
      }
    });
  }

  filterPlantas() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPlantas = this.plantas.filter(planta => 
      planta.nombrePlanta.toLowerCase().includes(searchTermLower)
    );
  }

  selectPlanta(planta: any) {
    this.router.navigate(['/arduino'], { queryParams: { id: planta.id, imagen: planta.imagen, nombrePlanta: planta.nombrePlanta } });
  }
}