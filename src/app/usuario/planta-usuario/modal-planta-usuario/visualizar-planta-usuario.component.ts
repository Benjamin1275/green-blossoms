import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-planta-usuario',
  templateUrl: './visualizar-planta-usuario.component.html',
  styleUrls: ['./visualizar-planta-usuario.component.scss'],
})
export class VisualizarPlantaUsuarioComponent {
  @Input() planta: any;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}