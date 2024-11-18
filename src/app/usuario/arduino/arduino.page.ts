import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreServicePlantas } from 'src/app/admin/services/plantas/planta.service'; // Importar el servicio de Firestore
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-arduino',
  templateUrl: './arduino.page.html',
  styleUrls: ['./arduino.page.scss'],
})
export class ArduinoPage implements OnInit {

  id: string = '';
  imagen: string = '';
  nombrePlanta: string = '';

  showInput = {
    temperatura: false,
    humedad: false,
    luminosidad: false,
  };

  showHelp = false;
  temperatureUnit: 'celsius' | 'fahrenheit' = 'celsius';
  temperatureValue: number | null = null;

  toggleInput(type: 'temperatura' | 'humedad' | 'luminosidad') {
    this.showInput[type] = !this.showInput[type];
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  addUnit(unit: 'celsius' | 'fahrenheit', event: any) {
    const input = event.target as HTMLInputElement;
    if (input) {
      const value = input.value.replace(/[^\d]/g, ''); // Elimina cualquier carácter no numérico
      input.value = unit === 'celsius' ? `${value}°C` : `${value}°F`;
    }
  }



  constructor(private route: ActivatedRoute, private firestoreService: FirestoreServicePlantas,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController
) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.imagen = params['imagen'];
      this.nombrePlanta = params['nombrePlanta'];
      console.log('ID de la planta:', this.id); // Verificar el ID
      console.log('Imagen de la planta:', this.imagen); // Verificar la imagen
      console.log('Nombre de la planta:', this.nombrePlanta); // Verificar el nombre
      if (this.id) {
        this.getPlantaDetails(this.id);
      } else {
        console.error('ID de la planta no está definido en los parámetros de la URL');
      }
    });
  }

  getPlantaDetails(id: string) {
    this.firestoreService.getPlanta(id).subscribe(planta => {
      if (planta) {
        this.imagen = planta.imagen;
        this.nombrePlanta = planta.nombrePlanta;
        console.log('Detalles de la planta:', planta); // Verificar los detalles de la planta
      } else {
        console.error('No se encontró la planta con el id:', id);
      }
    }, error => {
      console.error('Error al obtener los detalles de la planta', error);
    });
  }

  async startConfiguration() {
    const loading = await this.loadingController.create({
      message: 'Configuración del arduino en curso!',
      duration: 3000, // Duración de 3 segundos
      spinner: 'circles'
    });

    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Planta configurada exitosamente!',
        duration: 2000, // Duración de 2 segundos
        position: 'top',
        color: 'success'
      });
      toast.present();
    }, 3000); // Espera 3 segundos antes de mostrar el mensaje de finalización
  }

  async confirmPause() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de detener el proceso de monitoreo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmación cancelada');
          }
        }, {
          text: 'Sí',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deteniendo monitoreo...',
              duration: 3000, // Duración de 3 segundos
              spinner: 'circles'
            });

            await loading.present();

            setTimeout(async () => {
              await loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Monitoreo detenido.',
                duration: 2000, // Duración de 2 segundos
                position: 'top',
                color: 'danger'
              });
              toast.present();
            }, 3000); // Espera 3 segundos antes de mostrar el mensaje de finalización
          }
        }
      ]
    });

    await alert.present();
  }

}