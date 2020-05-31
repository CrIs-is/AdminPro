import { Component, OnInit , OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'; 
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() { 
  
  }

  ngOnInit(): void {
    this. subscription = this.getContador().subscribe(
        numero => console.log("asa",numero),
        error => console.log("error",error),
        ()=> console.log("complete")
      )
  }

  getContador(){
    return new Observable( observer => {
      let contador=0;

     
      let intervalo = setInterval(()=>{
        contador++
        let salida = {
          valor: contador
        }
        observer.next(salida)
        /*if (contador ==3){
          clearInterval(intervalo)
          observer.complete();
        }*/
        //if (contador == 2 ){
         // observer.error("Error")
        //}
      },500)
      
    }).pipe(map( (res: any) =>{
      return res.valor
    }),filter( (valor:number)=>{
      return   valor % 2 == 1
    })
    ,retry(3))
      
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("Cerrando pagina")
    this.subscription.unsubscribe()
  }
}
