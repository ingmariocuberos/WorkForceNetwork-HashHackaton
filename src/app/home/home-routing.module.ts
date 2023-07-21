import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './cita/cita.component';
import { LandingComponent } from './landing/landing.component';
import { PagoComponent } from './pago/pago.component';
import { SimuladorComponent } from './simulador/simulador.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'simulador',
        component: SimuladorComponent
      },
      {
        path: 'pago',
        component: PagoComponent
      },
      {
        path: 'cita',
        component: CitaComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
