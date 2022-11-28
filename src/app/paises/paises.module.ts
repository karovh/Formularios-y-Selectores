import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './pages/selector.component';
import { PaisesRoutingModule} from './paises-routing.module';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    SelectorComponent   
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaisesModule { }
