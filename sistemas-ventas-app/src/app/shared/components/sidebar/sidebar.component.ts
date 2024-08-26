import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() closeSidebar = new EventEmitter<void>();
  menus: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generarMenu();
  }

  private generarMenu(): void {
    this.menus.push(...[
      {icon: 'home', name: 'Inicio', route: 'home'},
      {icon: 'person', name: 'Usuarios', route: 'admin/usuarios'},
      {icon: 'category', name: 'Categorias', route: 'admin/categorias'},
      {icon: 'inventory_2', name: 'Productos', route: 'admin/productos'},
      {icon: 'shopping_cart', name: 'Ventas', route: 'ventas/ventas'},
      {icon: 'assignment', name: 'Reportes', route: 'ventas/reportes'}
    ]);
  }

  // Método para manejar el clic en una opción de menú
  onMenuClick(menuRoute: string): void {
    if (this.router.url === `/${menuRoute}`) {
      console.log(this.router.url);
      // Si ya estamos en la ruta seleccionada, emitimos el evento para cerrar el sidebar
      this.closeSidebar.emit();
    }
  }
}
