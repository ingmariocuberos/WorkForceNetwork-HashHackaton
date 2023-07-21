import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl ): ValidationErrors | null {
    let value = control.value?.trim().toLowerCase();
    if ( value === 'strider'){
      return {
        noStrider: true
      }
    }
    return null;
  }

  camposIguales( campo1: string, campo2: string ){
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      let pass1 = formGroup.get(campo1)?.value;
      let pass2 = formGroup.get(campo2);
      if ( pass1 !== pass2?.value ){
        let errorToSet = {
          noIguales: 'Campos no iguales'
        }
        pass2?.setErrors(errorToSet);
        return errorToSet;
      }

      return null;
    }
  }
}
