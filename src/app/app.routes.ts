import { RouterModule,Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';



export const routes: Routes = [

    {path:'', component:PagesComponent },
    {path:'login', component:LoginComponent },
    {path:'register', component: RegisterComponent },
    //{path:'', redirectTo:'dashboard', pathMatch: 'full' },
    {path:'**', component: NopagefoundComponent },

    
]

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true});