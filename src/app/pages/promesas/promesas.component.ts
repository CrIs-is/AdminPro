import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { 

  }

  ngOnInit(): void {
    this.getSecond().then(
      (data) => console.log("La promesa terminó", data)
      )
      .catch( error => console.error("Promesa con error", error))
  }


  getSecond() {
     return new Promise(( resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador++
        console.log("contador")
        if (contador == 3){
          resolve(true)
          clearInterval( intervalo)
        }
      },1000);
    });
    
  }

}
