import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;

  imagenSubir:File;

  imagenTemp:string;

  constructor(public _userService: UsuarioService) {
    this.usuario = this._userService.usuario;
   }

  ngOnInit(): void {
    
  }

  guardar(usuario:Usuario){
    //console.log(usuario);
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this.usuario.name = usuario.name;
    

    this._userService.actualizarUsuario(this.usuario).subscribe((res: any)=>{
      console.log(res);
      
     
      
    })

  }

  seleccionImagen(archivo: File){
    
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes','El archivo seleccionado no es una imagen','error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result as string;

  }

  cambiarImagen(){
    this._userService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }

}
