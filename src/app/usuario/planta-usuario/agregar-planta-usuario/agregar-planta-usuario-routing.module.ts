import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPlantaUsuarioPage } from './agregar-planta-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPlantaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPlantaPageRoutingModule {}
