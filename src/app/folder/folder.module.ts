import { NgModule } from '@angular/core';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    FolderPageRoutingModule,
    FolderPage  // ✅ Solo importar el componente standalone
  ],
})
export class FolderPageModule { }