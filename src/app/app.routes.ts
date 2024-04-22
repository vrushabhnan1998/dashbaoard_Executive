import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

export const routes: Routes = [
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, 
    {
        path:"dashboard",
        component:DashboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes),NgxDaterangepickerMd.forRoot(), ],
    exports: [RouterModule],
    providers: [DaterangepickerConfig]
  })
  export class AppRoutingModule {
  }