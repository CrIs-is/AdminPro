import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
declare function init_plugins();

declare const gapi:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  recuerdame: boolean = false;

  auth2:any;
  constructor(public router: Router,public _usuarioService:UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem("email") || '';

    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }


  attachSignin( elemento ){
    this.auth2.attachClickHandler( elemento, {}, (googleUser) =>{
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe((res)=>{
        console.log(res);
        window.location.href = '#/dashboard';
      });
      //console.log(token);
      
    });
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '441182130531-k4lc3mvnp9g9573esd241th07c7au93h.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'))
    })
  }

  ingresar(formulario:NgForm){
    if (formulario.invalid){
      return;
    }

    let usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password
    );
    
    this._usuarioService.login(usuario,formulario.value.recuerdame).subscribe(res => this.router.navigate(['/dashboard']))
    //console.log(formulario.valid);
    //console.log(formulario.value);
    //this.router.navigate(['/dashboard'])
  }

}
