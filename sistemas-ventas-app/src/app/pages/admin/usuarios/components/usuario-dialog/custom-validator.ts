import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

/**
 * Feha: 17/07/2023
 * @author Carlos Eduardo Mata Rojas
 * @description Validator personalizado para el formulario de actualizar contraseña
 * @version 3.0
 */
export class CustomValidator {
    /**
     * Método para validar que el campo no solamente contenga espacios en blanco
     * @param control Es el campo del formulario que se va a validar
     * @returns {Object} Un objeto con la propiedad `sinEspaciosEnBlanco: true` en caso de que el campo contenga solo espacios en blanco, o `null` en caso contrario.
     */
    static sinEspaciosEnBlanco(
        control: FormControl
    ): {[key: string]: boolean} | null {
        //Se comprueba que el campo no sea nulo
        if (control.value !== null) {
            // Se utiliza trim para eliminar los espacios en blanco
            // El método length para saber cuantos caracteres tiene la cadena de texto
            if (
                control.value.trim() === '' ||
                control.value.trim().length === 0
            ) {
                return {sinEspaciosEnBlanco: true};
            }
        }
        return null;
    }

    /**
     * Método para validar que el campo contenga al menos una letra mayúscula
     * @param control El campo del formulario que se va a validar
     * @returns Un objeto con la propiedad `contieneMayuscula: true` si no se encuentra una letra mayúscula, o `null` en caso contrario.
     */
    static contieneMayuscula(
        control: FormControl
    ): {[key: string]: boolean} | null {
        if (control.value !== null) {
            // Se utiliza una expresión regular para buscar al menos una letra mayúscula
            if (!/[A-Z]/.test(control.value)) {
                return {contieneMayuscula: true};
            }
        }
        return null;
    }

    /**
     * Método para validar que el campo contenga al menos una letra minúscula
     * @param control El campo del formulario que se va a validar
     * @returns Un objeto con la propiedad `minusculaRequerida: true` si no se encuentra una letra minúscula, o `null` en caso contrario.
     */
    static contieneMinuscula(
        control: FormControl
    ): {[key: string]: boolean} | null {
        if (control.value !== null) {
            // Se utiliza una expresión regular para buscar al menos una letra minúscula
            if (!/[a-z]/.test(control.value)) {
                return {contieneMinuscula: true};
            }
        }
        return null;
    }

    /**
     * Método para validar que el campo contenga al menos un número
     * @param control El campo del formulario que se va a validar
     * @returns Un objeto con la propiedad `numeroRequerido: true` si no se encuentra un número, o `null` en caso contrario.
     */
    static contieneNumero(
        control: FormControl
    ): {[key: string]: boolean} | null {
        if (control.value !== null) {
            // Se utiliza una expresión regular para buscar al menos un número
            if (!/\d/.test(control.value)) {
                return {contieneNumero: true};
            }
        }
        return null;
    }

    /**
     * Método para validar que el campo contenga al menos un carácter especial
     * @param control El campo del formulario que se va a validar
     * @returns Un objeto con la propiedad `caracterEspecialRequerido: true` si no se encuentra un carácter especial, o `null` en caso contrario.
     */
    static contieneCaracterEspecial(
        control: FormControl
    ): {[key: string]: boolean} | null {
        if (control.value !== null) {
            // Se utiliza una expresión regular para buscar al menos un carácter especial
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(control.value)) {
                return {contieneCaracterEspecial: true};
            }
        }
        return null;
    }

    static passwordsNoCoinciden(
        control: FormControl
    ): {[key: string]: boolean} | null {
        const password = control.parent?.get('password')?.value;
        const confirmPassword = control.value;

        if (password !== confirmPassword) {
            return {passwordsNoCoinciden: true};
        }

        return null;
    }

}
