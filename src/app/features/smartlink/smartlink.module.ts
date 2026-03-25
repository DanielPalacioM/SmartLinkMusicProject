import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmartlinkRoutingModule } from './smartlink-routing.module';
import { PublicPageComponent } from './public-page/public-page.component';

@NgModule({
  declarations: [PublicPageComponent],
  imports: [
    CommonModule,
    RouterModule,        // <-- necesario para routerLink del sidebar
    SmartlinkRoutingModule
  ]
})
export class SmartlinkModule { }
