import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeUsuarioPageRoutingModule } from './home-usuario-routing.module';
import { HomeUsuarioPage } from './home-usuario.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeUsuarioPageRoutingModule,
    SharedModule
  ],
  declarations: [HomeUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeUsuarioPageModule {}
