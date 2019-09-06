import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// componente
import { ArchivosComponent } from './pages/archivos/archivos.component';

const routes: Routes = [
  {
    path: '',
    component: ArchivosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
