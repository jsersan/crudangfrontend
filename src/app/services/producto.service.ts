// src/app/services/producto.service.ts

// Importación de Angular Injectable para crear un servicio
import { Injectable } from '@angular/core';
// HttpClient para realizar peticiones HTTP a nuestra API
import { HttpClient } from '@angular/common/http';
// Observable para manejar operaciones asíncronas
import { Observable } from 'rxjs';
// Importación del modelo Producto
import { Producto } from '../models/producto.model';

/**
 * Servicio para manejar todas las operaciones CRUD relacionadas con productos.
 * Este servicio se comunica con la API REST del backend.
 * @Injectable({providedIn: 'root'}) - Decorador que permite que este servicio 
 * sea inyectado en otros componentes y que esté disponible en toda la aplicación
 */
@Injectable({
  providedIn: 'root' 
  // Disponible en toda la aplicación sin necesidad de incluirlo en 'providers' del módulo
})
export class ProductoService {
  // URL base de la API que se utilizará para todas las peticiones
  private apiUrl = 'http://localhost:3000/api/productos';

  /**
   * Constructor del servicio
   * @param http - Inyección del servicio HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los productos desde la API
   * @returns Observable con un array de productos
   */
  getAll(): Observable<Producto[]> {
    // Realiza una petición GET a la URL de la API y devuelve un observable
    // El tipo <Producto[]> indica que la respuesta será un array de objetos Producto
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /**
   * Obtiene un producto específico por su ID
   * @param id - ID del producto a obtener
   * @returns Observable con un único producto
   */
  get(id: number): Observable<Producto> {
    // Construye la URL con el ID y realiza una petición GET
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo producto
   * @param data - Datos del producto a crear
   * @returns Observable con la respuesta del servidor
   */
  create(data: Producto): Observable<any> {
    // Realiza una petición POST enviando los datos del producto
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Actualiza un producto existente
   * @param id - ID del producto a actualizar
   * @param data - Nuevos datos del producto
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, data: Producto): Observable<any> {
    // Construye la URL con el ID y realiza una petición PUT con los nuevos datos
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Elimina un producto por su ID
   * @param id - ID del producto a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Construye la URL con el ID y realiza una petición DELETE
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca productos por nombre
   * @param nombre - Nombre o parte del nombre a buscar
   * @returns Observable con un array de productos que coinciden con la búsqueda
   */
  findByNombre(nombre: string): Observable<Producto[]> {
    // Realiza una petición GET con un parámetro de consulta para el nombre
    // La API backend debe manejar este parámetro para filtrar los resultados
    return this.http.get<Producto[]>(`${this.apiUrl}?nombre=${nombre}`);
  }
}