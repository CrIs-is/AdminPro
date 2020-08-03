import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { SubirArchivosService } from '../../services/subir archivo/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {
  usuario:Usuario;

  imagenSubir:File;

  imagenTemp:string;

  constructor(public _subirArchivoService: SubirArchivosService, public modalUpload: ModalUploadService) { 
    
  }

  ngOnInit(): void {
  }
  
  cerrarModal(){
    this.imagenSubir = null;

    this.imagenTemp = null;
    this.modalUpload.ocultarModal();

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

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,this.modalUpload.tipo,this.modalUpload.id)
    .then((res)=>{
      console.log(res);
      this.modalUpload.notificacion.emit(res);
      this.cerrarModal();
    })
    .catch(err=>{
      console.log(err);
      
    })
    
  }
}
