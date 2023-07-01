import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
/*   { path: 'changePaswordAuth/:id', component: ForgotChangePasswordComponent},
  { path: 'mios', loadChildren: () => import('./mios/mios.module').then(m => m.MiosModule),
    component: MiosComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] 
  },*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
