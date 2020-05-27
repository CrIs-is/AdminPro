import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl:'assets/css/colors/default.css',
    tema:'default'
  };
  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }
  guaradarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ))
    console.log("guardado en el local storage")
  }

  cargarAjustes(){
    if( localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'))
      console.log("data")
      this.aplicarTema(this.ajustes.tema)
    }else {
      console.log("no data")
      this.aplicarTema(this.ajustes.tema)
    }
  }

  aplicarTema( tema : string){
    
    
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href',url)
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guaradarAjustes();
  }
}

interface Ajustes {
  temaUrl: string,
  tema: string
}