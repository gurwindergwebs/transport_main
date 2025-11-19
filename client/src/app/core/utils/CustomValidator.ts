import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {

  // Number-only validator with Angular standard typing
  static numeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === '') return null;

      const isValid = /^[0-9]+(\.?[0-9]+)?$/.test(value.toString());

      return isValid ? null : { invalidNumber: true };
    };
  }
}


export class ValidateAllFormFields {

  static validateAllFormFields(form: FormGroup | FormArray): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);

      if (!control) return;

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }
}
