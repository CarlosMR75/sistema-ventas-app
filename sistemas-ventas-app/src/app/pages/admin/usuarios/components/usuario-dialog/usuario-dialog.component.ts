import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { CustomValidator } from './custom-validator';
import { UsuarioService } from '../../services/usuarios.service';
import { Usuario } from '../../../../../shared/models/usuario.interface';
import { Rol } from '../../../../../shared/models/rol.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  titleButton = 'Guardar';
  actionTodo = Action.NEW;
  hide = true;
  hidepass = true;
  roles: Rol[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsuarioDialogComponent>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private usuarioSrv: UsuarioService
  ) { }

  userForm = this.fb.group({
    cveusuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    cverol: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), CustomValidator.passwordsNoCoinciden]],
  });

  ngOnInit(): void {
    this.usuarioSrv.listarRoles()
    .pipe(takeUntil(this.destroy$))
    .subscribe( (roles: Rol[]) => {
      this.roles = roles;
      this.pathData();
    });
  }

  pathData(): void {
    if (this.data?.user?.cveusuario) {
      // * Actualizar
      this.titleButton = 'Actualizar';
      this.actionTodo = Action.EDIT;
      this.userForm.patchValue({
        cveusuario: this.data?.user.cveusuario,
        nombre: this.data?.user.nombre,
        apellidos: this.data?.user.apellidos,
        username: this.data?.user.username,
        cverol: this.data?.user.cverol, 
      })

      this.userForm.get('username')?.disable();

      this.userForm.get('username')?.clearValidators();
      this.userForm.get('username')?.updateValueAndValidity();
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    } else {
      // * Insertar
      this.titleButton = 'Guardar';
      this.actionTodo = Action.NEW;
      console.log(this.userForm);
      this.userForm.get('cveusuario')?.disable();
    }
  }

  onSave() {
    console.log(this.actionTodo);
    
    console.log(this.userForm.invalid);

    if (this.userForm.invalid) return

    var formValue = this.userForm.value;

    if (this.actionTodo == Action.NEW) {
      // * Insertar
      var newUser: Usuario = {
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        username: formValue.username!,
        password: formValue.password!,
        cverol: parseInt(formValue.cverol!)
      }

      console.log(newUser);

      this.usuarioSrv.addUsuario(newUser).pipe(takeUntil(this.destroy$)).subscribe(
        (data: Usuario) => {
          this.dialogRef.close(data)
        }
      )
    } else {
      // * Actualizar
      var updatedUser: Usuario = {
        cveusuario: parseInt(formValue.cveusuario!),
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        cverol: parseInt(formValue.cverol!)
      }

      console.log(updatedUser);

      this.usuarioSrv.updateUsuario(updatedUser).pipe(takeUntil(this.destroy$)).subscribe(
        (data: Usuario) => {
          this.dialogRef.close(data)
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
