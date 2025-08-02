import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'counter', loadChildren: () => 
            import('./counter/counter.module').then( m => m.CounterModule)
  },
  { path: 'courses', loadChildren: () => 
            import('./courses/courses.module').then(m => m.CoursesModule)
  },
  { path: 'auth', loadChildren: () => 
            import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
