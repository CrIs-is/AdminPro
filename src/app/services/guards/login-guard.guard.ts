import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _userService: UsuarioService,public router: Router){

  }
  canActivate(){

    if(this._userService.estaLogeado()){
      console.log("Paso por el login guard");
      return true;
    }
    else{
      console.log("bloqueado por el guard");
      this.router.navigate(['/login']);
      return false;
    }

  }
    
    
  
  
}
