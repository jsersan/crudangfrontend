// src/app/components/producto-detalle/producto-detalle.component.ts

// Importaciones necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Importación del modelo Producto
import { Producto } from '../../models/producto.model';
// Importación del servicio para operaciones CRUD
import { ProductoService } from '../../services/producto.service';
// Importación para mostrar notificaciones
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Componente para mostrar y modificar los detalles de un producto específico
 * Este componente se muestra en una página dedicada (no en un diálogo)
 */
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: []
})
export class ProductoDetalleComponent implements OnInit {
  // Objeto para almacenar el producto actual
  // Se inicializa con valores por defecto para evitar errores de undefined
  currentProducto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };
  
  // Variable para mensajes de estado/error
  message = '';

  /**
   * Constructor del componente
   * @param productoService - Servicio para operaciones CRUD de productos
   * @param route - Servicio que proporciona acceso a la información de la ruta actual
   * @param router - Servicio para navegar entre rutas
   * @param snackBar - Servicio de Angular Material para mostrar notificaciones
   */
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   * Aquí obtenemos el ID de la ruta y cargamos el producto
   */
  ngOnInit(): void {
    // Obtiene el parámetro 'id' de la URL y lo usa para cargar el producto
    this.obtenerProducto(this.route.snapshot.params['id']);
  }

  /**
   * Método para obtener un producto específico por su ID
   * @param id - ID del producto a obtener
   */
  obtenerProducto(id: number): void {
    this.productoService.get(id)
      .subscribe({
        next: (data) => {
          // Almacena el producto obtenido en la variable currentProducto
          this.currentProducto = data;
        },
        error: (e) => console.error(e)
      });
  }

  /**
   * Método para actualizar el producto actual
   * Utiliza los datos actuales del modelo currentProducto
   */
  actualizarProducto(): void {
    this.productoService.update(this.currentProducto.id!, this.currentProducto)
      .subscribe({
        next: (res) => {
          // Muestra una notificación de éxito
          this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
            duration: 3000 // Duración en milisegundos
          });
        },
        error: (e) => console.error(e)
      });
  }

  /**
   * Método para eliminar el producto actual
   * Incluye una confirmación antes de proceder
   */
  eliminarProducto(): void {
    // Solicita confirmación al usuario
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.productoService.delete(this.currentProducto.id!)
        .subscribe({
          next: (res) => {
            // Navega de vuelta a la lista de productos
            this.router.navigate(['/productos']);
            // Muestra una notificación de éxito
            this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (e) => console.error(e)
        });
    }
  }
}
