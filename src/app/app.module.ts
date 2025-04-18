// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importante para los inputs dentro de form-field
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosListComponent,
    ProductoDetalleComponent,
    ProductoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Módulos de Angular Material
    MatFormFieldModule,
    MatInputModule, // Este es crucial para mat-form-field
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }