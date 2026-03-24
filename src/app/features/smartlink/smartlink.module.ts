import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartlinkRoutingModule } from './smartlink-routing.module';
import { PublicPageComponent } from './public-page/public-page.component';

@NgModule({
  declarations: [PublicPageComponent],
  imports: [
    CommonModule,
    SmartlinkRoutingModule
  ]
})
export class SmartlinkModule { }