import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: [
  ]
})
export class BreadcumbsComponent implements OnInit {

  public nombrePage;

  constructor(private router: Router, private title: Title, private meta: Meta) { 
    
    this.getDataRoute().subscribe( (event: ActivationEnd ) =>{
      console.log(event)
      this.nombrePage = event;
      this.title.setTitle(this.nombrePage)
      let metaTag: MetaDefinition = {
        name: 'Description',
        content: this.nombrePage

      };
      this.meta.updateTag(metaTag)
    })
  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.router.events.pipe(filter((data)=>{
      return data instanceof ActivationEnd
    }),filter((data: ActivationEnd)=>{
      return data.snapshot.data.titulo != null
    }),map((data: ActivationEnd)=>{
      return data.snapshot.data.titulo
    }))
  }

}
