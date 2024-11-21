import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarPlantaUsuarioPageRoutingModule } from './editar-planta-usuario-routing.module';
import { EditarPlantaUsuarioPage } from './editar-planta-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPlantaUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarPlantaUsuarioPage]
})
export class EditarPlantaUsuarioPageModule {}