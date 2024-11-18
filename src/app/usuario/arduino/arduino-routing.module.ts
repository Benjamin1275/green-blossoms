import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArduinoPage } from './arduino.page';

const routes: Routes = [
  {
    path: '',
    component: ArduinoPage
  },  {
    path: 'riego-planta',
    loadChildren: () => import('./riego-planta/riego-planta.module').then( m => m.RiegoPlantaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArduinoPageRoutingModule {}
