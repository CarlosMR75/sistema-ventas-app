import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Usuario } from '../../../../shared/models/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../../../shared/models/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.API_URL}/api/users`, {headers: { "requireToken":"true"}}).pipe(catchError((error) => this.handlerError(error)));
  }

  
  listarRoles() : Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.API_URL}/api/general/roles`, { headers: {"requireToken" : "true"}})
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.API_URL}/api/users`, usuario, {headers: { "requireToken":"true"}}).pipe(catchError((error) => this.handlerError(error)));
  }

  updateUsuario(Usuario: any): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/users`, Usuario, {headers: { "requireToken":"true"}}).pipe(catchError((error) => this.handlerError(error)));;
  }

  deleteUsuario(cveusuario: any): Observable<any> {
    console.log(cveusuario)
    return this.http.post(`${environment.API_URL}/api/users/delete`, cveusuario, {headers: { "requireToken":"true"}}).pipe(catchError((error) => this.handlerError(error)));;
  }

  private handlerError(error: any) {
    var errorMessage = 'Ocurrió un error';

    if (error.error) {
      if (error.error.message) errorMessage = error.error.message;
      else errorMessage = 'Ocurrió un error';
    }

    this.snackBar.open(errorMessage, '', { duration: 3000 });

    return throwError(() => {
      new Error(errorMessage);
    });
  }

}
