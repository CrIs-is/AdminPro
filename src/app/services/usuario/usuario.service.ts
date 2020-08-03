import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subir archivo/subir-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor(public http: HttpClient , public router: Router,public _subirArhicoService:SubirArchivosService) {
    this.cargarLocalStorage();
   }

  //Opciones del localStorage
  cargarLocalStorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario")); 
    }
    else{
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string,token:string,usuario:Usuario){
    localStorage.setItem("id",id);
    localStorage.setItem("token",token);
    localStorage.setItem("usuario",JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }



  crearUsuario(usuario : Usuario){
    let url = URL_SERVICIOS + '/usuarios';

    return this.http.post(url, usuario)
    .pipe(map((res:any)=>{
      Swal.fire("Usuario Creado",usuario.email,"success");
      return res.usuario;
    }))
    
  }

  login(usuario: Usuario, recordar: boolean = false){

    if(recordar){
      localStorage.setItem("email",usuario.email);
    }
    else{
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario)
    .pipe(
      map((res:any)=>{
        /*localStorage.setItem("id",res.id);
        localStorage.setItem("token",res.token);
        localStorage.setItem("usuario",JSON.stringify(res.user));*/
        this.guardarStorage(res.id,res.token,res.user);

        return true;
      })
    )
  }

  loginGoogle(token : string){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token} ).pipe(
      map((res:any)=>{
        this.guardarStorage(res.id,res.token,res.user);
        return true;
      })
    );
  }

  estaLogeado(){
    return (this.token.length > 5) ? true: false;    
  }

  actualizarUsuario( usuario : Usuario){
    let url = URL_SERVICIOS + '/usuarios/' + usuario._id;
    url += '?token=' + this.token;
    //console.log(url)
    return this.http.put( url, usuario).pipe(
      map((res: any)=>{

        if( usuario._id == this.usuario._id){
          let usuarioDB : Usuario = res.usuario;
          this.guardarStorage(usuarioDB._id,this.token,usuarioDB);

        }
        Swal.fire("Usuario Actualizado",usuario.name,"success")
        return true;
      })
    );
  }


  cambiarImagen(archivo:File,id:string){
    this._subirArhicoService.subirArchivo(archivo,'usuarios',id)
    .then((res : any) =>{
      //console.log(res);
      this.usuario.img = res.usuarioActualizado.img;
      Swal.fire("Imagen actualizada",this.usuario.name,"success");

      this.guardarStorage(id,this.token,this.usuario);
      
    }).catch(res =>{
      console.log(res)
    })
  }

  cargarUsuarios(desde:number = 0){
    let url = URL_SERVICIOS + '/usuarios?desde='+desde;

    return this.http.get(url);
  }

  buscarUsuario(termino : string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url).pipe(map((res : any)=>{
      return res.usuarios
    })
    )
  }


  borrarUsuario( id : string){
    let url = URL_SERVICIOS + '/usuarios/'+id;
    url += '?token='+this.token;

    return this.http.delete(url);
  }
}
