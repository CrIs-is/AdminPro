import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];

  desde:number = 0;
  total:number = 0;

  cargando:boolean = true;
  constructor(public _usuarioService: UsuarioService,public _modalUpload: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUpload.notificacion.subscribe(event =>{
      this.cargarUsuarios()
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((res : any)=>{
      //console.log(res);
      this.total = res.total;
      this.usuarios = res.usuarios;
      this.cargando = false; 

    })
  }

  cambiarPagina(valor:number){
    let desde = this.desde + valor;
    console.log(desde);

    if(desde > this.total){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino : string){

    if(termino.length <=0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
      this._usuarioService.buscarUsuario(termino).subscribe((usuarios : Usuario[])=>{
        this.usuarios = usuarios
        this.cargando = false
        console.log(usuarios);
        
      }) 
  }

  borrarUsuario( usuario : Usuario){
    if( usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No se puede eliminar usuario','no puede eliminarse a si mismo','error')
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una vez borrado no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, borrar usuario'
    }).then((result) => {
      if (result.value) {
       this._usuarioService.borrarUsuario(usuario._id).subscribe((res)=>{
        Swal.fire(
          'Deleted!',
          'Usuario borrado.',
          'success'
        )
        console.log(res);
        this.cargarUsuarios()

       })
      }      
    })
  }

  guardarUsuario(usuario : Usuario){
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe(console.log)
    
  }

  cambiarImagen(id: string){
    this._modalUpload.mostrarModal('usuarios',id)
  }
}
