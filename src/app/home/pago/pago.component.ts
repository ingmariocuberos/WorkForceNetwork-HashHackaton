import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TramitesService } from 'src/app/services/tramites.service';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styles: [
  ]
})
export class PagoComponent {
  public pagoForm: FormGroup = this.fb.group({
    access: [ '', [ Validators.required, Validators.minLength(7), Validators.maxLength(30) ] ],
    tipoIde1: [ '', [ Validators.required ]],
    numId: [ '', [ Validators.required, Validators.minLength(7), Validators.maxLength(30) ]],
    confirmNumId: [ '', [ Validators.required, Validators.minLength(7), Validators.maxLength(30) ] ],
    firstName: [ '', [ Validators.required ] ],
    lastName: [ '', [ Validators.required ] ],
    mobile: [ '', [ Validators.required, Validators.minLength(6), Validators.maxLength(15)  ]],
    email: [ '', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ] ],
    confirmEmail: [ '', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ] ],
    tipoIde2: [ '', [ Validators.required ]],
  },{
    validators: [ 
      this.vs.camposIguales( 'numId', 'confirmNumId' ),
      this.vs.camposIguales( 'email', 'confirmEmail' ),
    ]
  }) 

  constructor(
    private fb: FormBuilder,
    private ts: TramitesService,
    private vs: EmailValidatorService
  ){

  }

  campoEsValido(campo: string){
    return this.pagoForm.get(campo)?.invalid && this.pagoForm.get(campo)?.touched
  }

  sendPayInfo(){
    if (!this.pagoForm.valid){
      this.pagoForm.markAllAsTouched();
      return;
    }

    this.ts.sendPayment(this.pagoForm.value)
      .subscribe( resp => {
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
          this.pagoForm.reset();
        }
      })
  }
  
  getIdErrors( campo: string ){
    const error = this.pagoForm.get(campo)?.errors ?? [];
    if ( error['required'] ){
      return 'El campo es obligatorio';
    } else if ( error['noIguales'] ){
      return 'Los números de documento no son iguales'
    } else {
      return '';
    }
  }

  getEmailErrors( campo: string ){
    const error = this.pagoForm.get(campo)?.errors ?? [];
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
}
