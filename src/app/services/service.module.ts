import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedService, SidebarService,SettingsService} from '../services/service.index'



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SharedService,
     SidebarService,
     SettingsService
  ],
})
export class ServiceModule { }
