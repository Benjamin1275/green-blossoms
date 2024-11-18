import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiegoPlantaPage } from './riego-planta.page';

const routes: Routes = [
  {
    path: '',
    component: RiegoPlantaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiegoPlantaPageRoutingModule {}
