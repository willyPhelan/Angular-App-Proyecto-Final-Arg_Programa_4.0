import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core' ;
import { MatSnackBarModule } from '@angular/material/snack-bar' ;
import { MatSelectModule } from '@angular/material/select' ;
import { BusesAdministrationRoutingModule } from './buses-administration-routing.module' ;
import { BusesListComponent } from './buses-list/buses-list.component' ;
import { BusDetailComponent } from './bus-detail/bus-detail.component.' ;


@NgModule({
  declarations: [BusesListComponent, BusDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BusesAdministrationRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class BusesAdministrationModule {}