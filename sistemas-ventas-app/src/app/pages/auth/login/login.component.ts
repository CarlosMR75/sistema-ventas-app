import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm } from '../../../shared/utils/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;

  private destroy$ = new Subject<any>();

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder, public baseForm: BaseForm, private authSvc: AuthService) { }

  ngOnInit(): void {

  }

  onlogin(){
    // * Verificar que el formulario es correcto
    if (this.loginForm.invalid) return

    // TODO: Obtener información del formulario
    // TODO y almecenarla en ima variable form
    const form = this.loginForm.value
    console.log('Data: '+form)

    // * ng g s pages/auth/services/auth
    // * ng g environments

    // TODO: Ejecutar el servicio para obtener los datos
    this.authSvc.login(form).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    console.log('Metdodo Ondestroy');
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
