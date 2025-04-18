import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosListComponent },
  { path: 'productos/:id', component: ProductoDetalleComponent },
  { path: 'add', component: ProductoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
