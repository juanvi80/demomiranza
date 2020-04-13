import { Component, OnInit } from '@angular/core';
import { MaestroService } from '../../service/maestro.service';
import { UsuariosWeb } from '../../models/Usuariosweb';
import { Logincliente } from '../../models/logincliente';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private mService: MaestroService) { }
  cliente: Logincliente;
  ngOnInit(): void {



  }

}
