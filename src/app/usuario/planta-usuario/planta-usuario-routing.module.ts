import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantaUsuarioPage } from './planta-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PlantaUsuarioPage
  },
  {
    path: 'agregar-planta-usuario',
    loadChildren: () => import('../planta-usuario/agregar-planta-usuario/agregar-planta-usuario.module').then( m => m.AgregarPlantaPageModule)
  },
  {
    path: 'editar-planta-usuario',
    loadChildren: () => import('../planta-usuario/editar-planta-usuario/editar-planta-usuario.module').then( m => m.EditarPlantaUsuarioPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantaUsuarioPageRoutingModule {}
