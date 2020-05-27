import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
        RouterModule,
        CommonModule
    ]
})

export class SharedModule{}