import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiegoPlantaPageRoutingModule } from './riego-planta-routing.module';

import { RiegoPlantaPage } from './riego-planta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiegoPlantaPageRoutingModule
  ],
  declarations: [RiegoPlantaPage]
})
export class RiegoPlantaPageModule {}
