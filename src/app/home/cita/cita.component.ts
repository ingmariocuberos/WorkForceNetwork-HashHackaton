import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { TramitesService } from 'src/app/services/tramites.service';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

const DateFormats = {
  parse: {
    dateInput: ['DD/MM/YYYY'],
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styles: [],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
  ],
})
export class CitaComponent {

  public citaForm: FormGroup = this.fb.group({
    access: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    numId: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    paymentDay: ['', [Validators.required]],
    processType: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.pattern( this.vs.emailPattern )]],
    confirmEmail: ['', [Validators.required, Validators.pattern( this.vs.emailPattern )]],
  },{
    validators: [ this.vs.camposIguales( 'email', 'confirmEmail' ) ]
  });

  constructor(private fb: FormBuilder, 
              private ts: TramitesService,
              private vs: EmailValidatorService) {}

  campoEsValido(campo: string) {
    return (
      this.citaForm.get(campo)?.invalid && this.citaForm.get(campo)?.touched
    );
  }

  getEmailErrors(campo: string ){
    const error = this.citaForm.get(campo)?.errors ?? [];
    if ( error['required'] ){
      return 'El campo es obligatorio';
    } else if ( error['pattern'] ){
      return 'El campo no tiene el formato de un correo electrónico';
    } else if ( error['noIguales'] ){
      return 'Los correos no son iguales'
    } else {
      return '';
    }
  }

  sendAppoinmentInfo() {

    if (!this.citaForm.valid){
      this.citaForm.markAllAsTouched();
      return;
    }

    const payDate = moment(this.citaForm.get('paymentDay')?.value);

    this.citaForm.get('paymentDay')?.setValue(payDate.format('DD/MM/YYYY'));   

    this.ts.sendAppoinment(this.citaForm.value)
      .subscribe((resp) => {
        if ( !resp.ok ){
          Swal.fire(
            'Error',
            resp.msg,
            'error'
          );
        } else {
          Swal.fire(
            'Envío exitoso',
            resp.msg,
            'success'
          );
          this.citaForm.reset();
        }
    });
  }
}
