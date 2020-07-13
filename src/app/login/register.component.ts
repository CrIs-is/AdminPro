import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';import { Usuario } from '../models/usuario.model';
;
import { UsuarioService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;
  constructor(public _usuarioService: UsuarioService,public router:Router) {
    
  }

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup({
      nombre:new FormControl( null , Validators.required ),
      email: new FormControl( null ,[Validators.required,Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl(false, Validators.required),
    },{ validators: this.compararCampos('password','password2')});
 
    this.forma.setValue({
      nombre:'test',
      email:'test@gmail.com',
      password:'12345',
      password2:'12345',
      condiciones:false
    })
  }


  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      Swal.fire("Importante","Debe aceptar las condiciones","warning");
      return;
    }
    //console.log(this.forma.value);
    console.log(this.forma.valid);

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario ).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/login']);
    })
  }

  compararCampos(campo1:string,campo2:string){
    return(group: FormGroup) =>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2){
        return null
      }

      return {
        soniguales:true
      };

    };

  }

}
