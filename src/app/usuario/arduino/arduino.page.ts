import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreServicePlantas } from 'src/app/admin/services/plantas/planta.service'; // Importar el servicio de Firestore

@Component({
  selector: 'app-arduino',
  templateUrl: './arduino.page.html',
  styleUrls: ['./arduino.page.scss'],
})
export class ArduinoPage implements OnInit {

  id: string = '';
  imagen: string = '';
  nombrePlanta: string = '';

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreServicePlantas) { }

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
}