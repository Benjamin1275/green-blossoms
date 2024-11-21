import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';

interface EstadisticasRiego {
  [key: string]: number;
}

@Component({
  selector: 'app-riego-planta',
  templateUrl: './riego-planta.page.html',
  styleUrls: ['./riego-planta.page.scss'],
})
export class RiegoPlantaPage implements OnInit {
  @ViewChild('barChart', { static: true }) barChart!: ElementRef;
  bars: any;
  colorArray: any;

  // Datos de ejemplo para las estadísticas de riego
  estadisticasRiego: EstadisticasRiego = {
    Lunes: 3,
    Martes: 2,
    Miércoles: 1,
    Jueves: 4,
    Viernes: 2,
    Sábado: 3,
    Domingo: 1
  };

  constructor(private alertController: AlertController, private toastController: ToastController) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createBarChart();
  }

  async riegoManual() {
    // Incrementa el conteo de riegos para el día actual
    const diaActual = this.obtenerDiaActual();
    this.estadisticasRiego[diaActual]++;

    // Actualiza el gráfico
    this.updateBarChart();

    // Muestra un mensaje de confirmación tipo toast
    const toast = await this.toastController.create({
      message: 'La planta se ha regado correctamente.',
      duration: 3000,
      position: 'top',
      color: 'success', // Color de fondo del toast
      buttons: [
        {
          text: 'OK', // Quitar 
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  configurarRiego() {
    console.log('Configuración de riego automático iniciada');
  }

  obtenerDiaActual(): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fecha = new Date();
    return dias[fecha.getDay()];
  }

  obtenerDias(): string[] {
    return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  }

  createBarChart() {
    const dias = this.obtenerDias();
    const valores = dias.map(dia => this.estadisticasRiego[dia]);

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: dias,
        datasets: [{
          label: 'Veces Regado',
          data: valores,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo
          borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Asegura que los ticks sean enteros
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value;
                }
                return null; // Asegura que siempre se devuelva un valor
              }
            }
          }
        }
      }
    });
  }

  updateBarChart() {
    const dias = this.obtenerDias();
    const valores = dias.map(dia => this.estadisticasRiego[dia]);

    this.bars.data.datasets[0].data = valores;
    this.bars.update();
  }
}