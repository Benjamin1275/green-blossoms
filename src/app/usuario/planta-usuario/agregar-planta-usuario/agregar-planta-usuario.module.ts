import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AgregarPlantaPageRoutingModule } from './agregar-planta-usuario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarPlantaUsuarioPage } from './agregar-planta-usuario.page';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPlantaPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarPlantaUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AgregarPlantaPageModule { }
