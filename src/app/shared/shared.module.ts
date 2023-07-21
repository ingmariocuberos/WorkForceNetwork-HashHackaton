import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarMenuComponent } from './bar-menu/bar-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BarMenuComponent
  ],
  exports: [
    BarMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
