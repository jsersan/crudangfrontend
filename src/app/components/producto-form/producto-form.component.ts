// src/app/components/producto-form/producto-form.component.ts

// Importaciones necesarias de Angular
import { Component, Inject, OnInit } from '@angular/core';
// Importaciones para formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importaciones para manejo de diálogos de Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Importación para mostrar notificaciones
import { MatSnackBar } from '@angular/material/snack-bar';
// Importación del modelo de Producto
import { Producto } from '../../models/producto.model';
// Importación del servicio para operaciones CRUD
import { ProductoService } from '../../services/producto.service';

/**
 * Componente para el formulario de creación y edición de productos
 * Este componente se muestra dentro de un diálogo de Angular Material
 */
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: []
})
export class ProductoFormComponent implements OnInit {
  // Declaración del formulario reactivo
  productoForm!: FormGroup;
  
  // Bandera para determinar si estamos editando o creando un producto
  isEditing = false;
  
  /**
   * Constructor del componente
   * @param fb - FormBuilder para crear formularios reactivos
   * @param productoService - Servicio para operaciones CRUD de productos
   * @param snackBar - Servicio para mostrar notificaciones
   * @param dialogRef - Referencia al diálogo actual para poder cerrarlo
   * @param data - Datos pasados al diálogo (puede ser un producto existente o un objeto vacío)
   */
  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    // dialogRef permite interactuar con el diálogo, por ejemplo, para cerrarlo
    public dialogRef: MatDialogRef<ProductoFormComponent>,
    // MAT_DIALOG_DATA es un token de inyección para recibir datos del componente que abrió el diálogo
    @Inject(MAT_DIALOG_DATA) public data: Producto
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   * Aquí creamos y configuramos el formulario
   */
  ngOnInit(): void {
    // Determinamos si estamos en modo edición verificando si el producto tiene ID
    this.isEditing = !!this.data.id;
    
    // Creamos el formulario reactivo con FormBuilder
    this.productoForm = this.fb.group({
      // Para cada campo, establecemos el valor inicial (desde data) y los validadores
      
      // nombre: obligatorio y mínimo 3 caracteres
      nombre: [this.data.nombre || '', [Validators.required, Validators.minLength(3)]],
      
      // descripcion: obligatorio
      descripcion: [this.data.descripcion || '', [Validators.required]],
      
      // precio: obligatorio y mayor o igual a 0
      precio: [this.data.precio || 0, [Validators.required, Validators.min(0)]],
      
      // stock: obligatorio y mayor o igual a 0
      stock: [this.data.stock || 0, [Validators.required, Validators.min(0)]]
    });
  }

  /**
   * Método que se ejecuta al enviar el formulario
   * Maneja tanto la creación como la actualización de productos
   */
  onSubmit(): void {
    // Verificamos si el formulario es válido antes de proceder
    if (this.productoForm.invalid) {
      return;
    }
    
    // Creamos un objeto producto con los valores del formulario
    const producto: Producto = {
      ...this.productoForm.value
      // Al usar el operador spread (...) estamos copiando todas las propiedades
    };
    
    // Determinamos si estamos editando o creando un producto
    if (this.isEditing) {
      // Actualización: llamamos al método update del servicio
      this.productoService.update(this.data.id!, producto)
        .subscribe({
          next: () => {
            // Notificamos el éxito con un snackbar
            this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
              duration: 3000 // Duración en milisegundos
            });
            // Cerramos el diálogo y pasamos true para indicar que se realizó una acción
            this.dialogRef.close(true);
          },
          error: (e) => console.error(e)
        });
    } else {
      // Creación: llamamos al método create del servicio
      this.productoService.create(producto)
        .subscribe({
          next: () => {
            // Notificamos el éxito con un snackbar
            this.snackBar.open('Producto creado correctamente', 'Cerrar', {
              duration: 3000
            });
            // Cerramos el diálogo y pasamos true para indicar que se realizó una acción
            this.dialogRef.close(true);
          },
          error: (e) => console.error(e)
        });
    }
  }

  /**
   * Método para cancelar la operación y cerrar el diálogo
   * No pasa ningún valor al cerrar, lo que indica que no se realizó ninguna acción
   */
  cancelar(): void {
    this.dialogRef.close();
  }
}