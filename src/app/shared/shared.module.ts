import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NopagefoundComponent,
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent,
        NopagefoundComponent,
    ],
    imports:[

    ]
})

export class SharedModule{}