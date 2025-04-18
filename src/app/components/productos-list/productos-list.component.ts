// src/app/components/productos-list/productos-list.component.ts

// Importaciones necesarias de Angular
import { Component, OnInit, ViewChild } from '@angular/core';
// Importaciones de Angular Material
import { MatPaginator } from '@angular/material/paginator';  // Para la paginación
import { MatTableDataSource } from '@angular/material/table'; // Para las tablas de datos
import { MatDialog } from '@angular/material/dialog'; // Para modales/diálogos
import { MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones tipo toast
// Importación del modelo Producto
import { Producto } from '../../models/producto.model';
// Importación del servicio para operaciones CRUD
import { ProductoService } from '../../services/producto.service';
// Importación del componente de formulario que se usará en el diálogo
import { ProductoFormComponent } from '../producto-form/producto-form.component';

/**
 * Componente para mostrar y gestionar la lista de productos
 * @Component - Decorador que define los metadatos del componente
 */
@Component({
  selector: 'app-productos-list', // Selector HTML del componente
  templateUrl: './productos-list.component.html', // Ruta al archivo de la plantilla HTML
  styleUrls: [] 
})
export class ProductosListComponent implements OnInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'acciones'];
  
  // Fuente de datos para la tabla de Material, inicializada como un array vacío
  // MatTableDataSource proporciona funcionalidades como ordenamiento, filtrado y paginación
  dataSource = new MatTableDataSource<Producto>([]);
  
  // Variable para almacenar el término de búsqueda
  nombreBusqueda: string = '';
  
  // Decorador ViewChild para acceder al componente de paginación en el DOM
  // El signo de exclamación (!) es un operador de aserción de no-nulidad en TypeScript
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Constructor del componente
   * @param productoService - Servicio para operaciones CRUD de productos
   * @param dialog - Servicio de Angular Material para mostrar diálogos/modales
   * @param snackBar - Servicio de Angular Material para mostrar notificaciones
   */
  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   * Aquí realizamos operaciones iniciales como cargar los datos
   */
  ngOnInit(): void {
    // Llama al método para obtener todos los productos al iniciar
    this.obtenerProductos();
  }

  /**
   * Método del ciclo de vida que se ejecuta después de que la vista del componente se ha inicializado
   * Perfecto para configurar elementos que requieren que el DOM esté listo
   */
  ngAfterViewInit() {
    // Asigna el paginador a la fuente de datos de la tabla
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Método para obtener todos los productos desde el servicio
   * Se suscribe al observable que retorna el servicio
   */
  obtenerProductos(): void {
    this.productoService.getAll()
      .subscribe({
        // Callback que se ejecuta cuando la petición es exitosa
        next: (data) => {
          // Asigna los datos recibidos a la fuente de datos de la tabla
          this.dataSource.data = data;
        },
        // Callback que se ejecuta si hay un error
        error: (e) => console.error(e)
      });
  }

  /**
   * Método para buscar productos por nombre
   * Utiliza el valor de la variable nombreBusqueda
   */
  buscarPorNombre(): void {
    // Verifica si hay un término de búsqueda válido (no vacío)
    if (this.nombreBusqueda.trim()) {
      // Llama al servicio para buscar productos por nombre
      this.productoService.findByNombre(this.nombreBusqueda)
        .subscribe({
          // Actualiza la tabla con los resultados de la búsqueda
          next: (data) => {
            this.dataSource.data = data;
          },
          error: (e) => console.error(e)
        });
    } else {
      // Si el campo de búsqueda está vacío, carga todos los productos
      this.obtenerProductos();
    }
  }

  /**
   * Método para abrir el formulario de producto (para crear o editar)
   * @param producto - Producto a editar (opcional). Si no se proporciona, crea uno nuevo.
   */
  abrirFormulario(producto?: Producto): void {
    // Abre un diálogo con el componente ProductoFormComponent
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px', // Ancho del diálogo
      data: producto || {} // Pasa el producto a editar o un objeto vacío para crear uno nuevo
    });

    // Se suscribe al evento de cierre del diálogo
    dialogRef.afterClosed().subscribe(result => {
      // Si hay un resultado (no se canceló la operación), recarga los productos
      if (result) {
        this.obtenerProductos();
      }
    });
  }

  /**
   * Método para eliminar un producto
   * @param id - ID del producto a eliminar
   */
  eliminarProducto(id: number): void {
    // Muestra un diálogo de confirmación
    if (confirm('¿Está seguro de eliminar este producto?')) {
      // Si el usuario confirma, llama al servicio para eliminar el producto
      this.productoService.delete(id)
        .subscribe({
          next: () => {
            // Muestra una notificación de éxito
            this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
              duration: 3000 // Duración de la notificación en milisegundos
            });
            // Recarga la lista de productos
            this.obtenerProductos();
          },
          error: (e) => console.error(e)
        });
    }
  }
}