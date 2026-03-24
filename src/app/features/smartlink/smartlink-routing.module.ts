import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';

const routes: Routes = [
  {path: '', component:PublicPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartlinkRoutingModule { }
