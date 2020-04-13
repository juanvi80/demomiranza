import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MaestroService } from '../../service/maestro.service';
import { Logincliente } from '../../models/logincliente';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../service/util.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Paciente } from '../../models/paciente';
import { Citas } from '../../models/citas';
import { MatPaginator } from '@angular/material/paginator';




@Component({
  selector: 'app-agendacitas',
  templateUrl: './agendacitas.component.html',
  styleUrls: ['./agendacitas.component.css']
})
export class AgendaCitasComponent  implements OnInit {

  displayedColumns: string[] = ['id', 'nif', 'nombre'];
  displayedColumns2: string[] = ['id', 'medico',
                                'dpto', 'fecha',  'estado', 'centro'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  isLoading = true;
  paciente: Paciente;
  pacientes: Paciente[];
  citas: Citas[];
  cliente: Logincliente;


  constructor(public router: Router, public dialog: MatDialog, private route: ActivatedRoute,
              private mService: MaestroService,
              private utilService: UtilService) {

              }

  selecpaciente(row:Paciente) {
    this.mService.getCitasByPaciente(row.cif).subscribe(
      data => { let prueba: any[];
        console.log(data);
        prueba = Array.from(data[0]).slice();
        this.citas = [];
        this.citas = prueba.concat(data[1]);
        this.citas = this.citas.slice();
        console.log(this.citas);
        this.isLoading = false
       },
     error => { this.isLoading = false;
                this.utilService.showSimpleMiddleToast('Ha habido algun error obteniendo la informacion de los pacientes: '
                                                       + error, 3000, 'pink');
     }
    );
  }
  colorRow(row: Citas): string {

    if (row.estado) {
      switch (row.estado) {
        case 'PENDIENTE': return 'blue'; break;
        case 'FACTURADA': return 'red'; break;
        default: return 'black';
      }
    } else {
      return 'warn';
    }
  }
  colorRow2(row: string): string {

    if (row) {
      switch (row) {
        case 'PENDIENTE': return 'blue'; break;
        case 'FACTURADA': return 'red'; break;
        default: return 'black';
      }
    } else {
      return 'warn';
    }
  }
     refreshPacientes() {
       this.isLoading = true;
       this.mService.getPacientes().subscribe(
        data => { let prueba: any[];

          prueba = Array.from(data[0]).slice();
          this.pacientes = [];
          this.pacientes = prueba.concat(data[1]);
          console.log(this.pacientes);
          this.dataSource = new MatTableDataSource(this.pacientes);
          this.dataSource.paginator = this.paginator;
          this.isLoading = false
         },
       error => { this.isLoading = false;
                  this.utilService.showSimpleMiddleToast('Ha habido algun error obteniendo la informacion de los pacientes: '
                                                         + error, 3000, 'pink');
       }
      );
     }
      ngOnInit() {

       this.refreshPacientes();

  }

  volver() {
    this.router.navigate(['main']);
  }


}
