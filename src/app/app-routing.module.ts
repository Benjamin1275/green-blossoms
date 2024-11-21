import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModificarRolesPage } from './admin/usuarios/roles/modificar-roles/modificar-roles.page';
import { WelcomeComponent } from './auth/welcome/welcome.component'; // 
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin/usuarios/roles/editar-rol/:id',
    component: ModificarRolesPage
  },
  {
    path: '', //Si el path es vacio, redirige a la nueva ruta deseada
    redirectTo: 'welcome', //Redirige apenas entra a la app
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./auth/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  // Usuario arduino y planta
  {
    path: 'home-usuario',
    loadChildren: () => import('./usuario/home-usuario/home-usuario.module').then( m => m.HomeUsuarioPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./usuario/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'arduino',
    loadChildren: () => import('./usuario/arduino/arduino.module').then( m => m.ArduinoPageModule)
  },
  {
    path: 'riego-planta',
    loadChildren: () => import('./usuario/arduino/riego-planta/riego-planta.module').then( m => m.RiegoPlantaPageModule)
  },
  {
    path: 'planta-usuario',
    loadChildren: () => import('./usuario/planta-usuario/planta-usuario.module').then( m => m.PlantaUsuarioPageModule)
  },
  {
    path: 'agregar-planta-usuario',
    loadChildren: () => import('./usuario/planta-usuario/agregar-planta-usuario/agregar-planta-usuario.module').then( m => m.AgregarPlantaPageModule)
  },
  {
    path: 'editar-planta-usuario/:id',
    loadChildren: () => import('./usuario/planta-usuario/editar-planta-usuario/editar-planta-usuario.module').then(m => m.EditarPlantaUsuarioPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }