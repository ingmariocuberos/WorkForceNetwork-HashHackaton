import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HomeRoutingModule } from './home-routing.module';
import { PagoComponent } from './pago/pago.component';
import { CitaComponent } from './cita/cita.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagoComponent,
    CitaComponent,
    SimuladorComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
