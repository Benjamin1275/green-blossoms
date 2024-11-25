import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

// Microservicios
import { ServiceUsuarioModule } from 'src/app/services/service-usuario/service-usuario.module';
import { ServicePlantaModule } from 'src/app/services/service-planta/service-planta.module';
import { ServiceArduinoModule } from 'src/app/services/service-arduino/service-arduino.module';
import { ServiceTemperaturaModule } from 'src/app/services/service-temperatura/service-temperatura.module';
import { ServiceHumedadModule } from 'src/app/services/service-humedad/service-humedad.module';
import { ServiceLuminosidadModule } from 'src/app/services/service-luminosidad/service-luminosidad.module';

// Importa el componente WelcomeComponent si no está en otro módulo
import { WelcomeComponent } from './auth/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent], // Asegúrate de declarar WelcomeComponent
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceUsuarioModule,
    ServicePlantaModule,
    ServiceArduinoModule,
    ServiceTemperaturaModule,
    ServiceHumedadModule,
    ServiceLuminosidadModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }