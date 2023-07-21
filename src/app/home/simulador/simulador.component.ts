import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
})
export class SimuladorComponent {
  public simulatorStatus: string = '';
  private source = timer(0, 1000);
  private clock!: Subscription;
  public timer:number = 60; 

  public pagoForm: FormGroup = this.fb.group(
    {
      numId: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(30),
        ],
      ],
      confirmNumId: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(30),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
      ],
      confirmEmail: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
      ],
      acepto: [
        '',
        [ Validators.required ]
      ]
    },
    {
      validators: [
        this.vs.camposIguales('numId', 'confirmNumId'),
        this.vs.camposIguales('email', 'confirmEmail'),
      ],
    }
  );

  public citaForm: FormGroup = this.fb.group(
    {
      numId: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(30),
        ],
      ],
      paymentDay: ['', [Validators.required]],
      processType: ['', [Validators.required]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
      ],
      confirmEmail: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
      ],
      acepto: [
        '',
        [ Validators.required ]
      ]
    },
    {
      validators: [this.vs.camposIguales('email', 'confirmEmail')],
    }
  );

  constructor(private fb: FormBuilder, private vs: EmailValidatorService) {}

  campoEsValido(model: string, campo: string) {
    if ( model === 'pago'){
      return (
        this.pagoForm.get(campo)?.invalid && this.pagoForm.get(campo)?.touched
      );
    } else if ( model === 'cita' ){
      return (
        this.citaForm.get(campo)?.invalid && this.citaForm.get(campo)?.touched
      );
    } else {
      return false;
    }
  }

  sendInfo(campo: string) {
    if (campo === 'pago' && !this.pagoForm.valid) {
      this.pagoForm.markAllAsTouched();
      return;
    } else if (campo === 'cita' && !this.citaForm.valid){
      this.citaForm.markAllAsTouched();
      return;
    }

    Swal.fire(
      'Envío exitoso',
      'Lograste llenar el formulario a tiempo',
      'success'
    );

    this.selectSimulatorStatus('');
  }

  getIdErrors(campo: string) {
    const error = this.pagoForm.get(campo)?.errors ?? [];
    if (error['required']) {
      return 'El campo es obligatorio';
    } else if (error['noIguales']) {
      return 'Los números de documento no son iguales';
    } else {
      return '';
    }
  }

  getEmailErrors(campo: string) {
    const error = this.pagoForm.get(campo)?.errors ?? [];
    if (error['required']) {
      return 'El campo es obligatorio';
    } else if (error['pattern']) {
      return 'El campo no tiene el formato de un correo electrónico';
    } else if (error['noIguales']) {
      return 'Los correos no son iguales';
    } else {
      return '';
    }
  }

  selectSimulatorStatus(status: string) {
    if (status === '') {
      this.clock.unsubscribe();
      this.citaForm.reset();
      this.pagoForm.reset();
    } else {
      this.clock = this.source.subscribe((t) => {
        this.timer = 60 - t;
        if( this.timer < 1 ){
          this.selectSimulatorStatus('');
        }
      });
    }
    this.simulatorStatus = status;
  }
}
