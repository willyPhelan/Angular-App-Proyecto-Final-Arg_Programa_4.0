import { NgModule } from '@angular/core' ;
import { RouterModule, Routes } from '@angular/router' ;
import { BusesListComponent } from './buses-list/buses-list.component' ;
import { BusDetailComponent } from './bus-detail/bus-detail.component.' ;

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BusesListComponent },
  { path: 'create', component: BusDetailComponent },
  { path: 'detail/:id', component: BusDetailComponent },
] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusesAdministrationRoutingModule {}