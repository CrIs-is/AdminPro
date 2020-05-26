import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda:string = 'Leyenda';
  @Input() progreso:number = 50;

  @Output() cambioValor:EventEmitter<number> = new EventEmitter();


  @ViewChild('txtProgreso',{ static: true}) txtProgres:ElementRef;
  constructor() { 
    console.log("leyenda", this.leyenda)
    console.log("progreso", this.progreso)
  }

  ngOnInit(): void {
    //console.log("leyenda", this.leyenda)
    //console.log("progreso", this.progreso)

  }
  cambiarValor(valor:number){

    if(this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;
    }
    if(this.progreso <= 0 &&  valor < 0){
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor
    
    //Emitiendo evento de ouput
    this.cambioValor.emit(this.progreso)
    this.txtProgres.nativeElement.focus();
  }

  onChanges(newValue: number){

    console.log(this.txtProgres.nativeElement.value)
    if(newValue >=100){
      this.progreso = 100
    }
    else if(newValue <= 0){
      this.progreso = 0
    }
    else{
      this.progreso = newValue
    }

    this.txtProgres.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso)
  }
}
