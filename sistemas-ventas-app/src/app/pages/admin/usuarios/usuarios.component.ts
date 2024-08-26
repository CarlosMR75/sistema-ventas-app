import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../shared/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioService } from './services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private usuarioSrv: UsuarioService) {
    
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayColumns: String[] = ['nombre', 'apellidos', 'username', 'rol', 'acciones'];

  usuarios: Usuario[] = [];

  listarUsuarios(): void {
    this.usuarioSrv.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe(
     (usuarios: Usuario[]) => {
      this.dataSource.data = usuarios
     }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}): void {
    console.log(user);
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      maxWidth: '100%',
      width: '80%',
      data: { user },
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(
      result => {
        if(result){
          this.listarUsuarios();
        }
      }
    )
  }

  deleteUser(cveusuario: any) {
    Swal.fire({
      title: "¿Seguro que deseas eliminar a este usuario?",
      showDenyButton: true,
      confirmButtonText: "Sí borralo",
      denyButtonText: `Cambie de opinion`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usuarioSrv.deleteUsuario({ cveusuario: cveusuario }).subscribe((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Completado',
            text: res.message,
            timer: 3000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
          });
          this.listarUsuarios();
        })
      } else if (result.isDenied) {
        Swal.fire("Operación cancelada", "", "info");
      }
    });
    console.log(cveusuario)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
