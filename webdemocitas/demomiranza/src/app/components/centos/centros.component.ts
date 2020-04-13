
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MaestroService } from '../../service/maestro.service';
import { UtilService } from '../../service/util.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Centro } from '../../models/centro';


@Component({
  selector: 'app-pedidos',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {
  displayedColumns: string[] = ['id',  'centro', 'cif'];
  dataSource: MatTableDataSource<Centro>;
  centros: Centro[];
  isLoading: boolean;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public router: Router,
              public  mService: MaestroService,
              public utilService: UtilService,
              public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(this.centros);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
    (data: Centro, filtersJson: string) => {
        const matchFilter = [];
        const filters = JSON.parse(filtersJson);

        filters.forEach(filter => {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(val.toString().toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      };
      console.log('cargando centros');
    /*this.mService.getCentros()
     .subscribe(
                data => {
                  this.centros = data;
                  console.log(data);
                this.dataSource.data = this.centros;
              } ,
              error => {
                this.utilService.showSimpleMiddleToast('Ha habido un error obteniendo informacion del centro: '  + error, 3000, 'pink');
              }
     ) ;*/
  }
  colorRow(row: Centro): string {
       return 'black';
  }
  flatten(arr, result) {
    if (typeof result === "undefined") {
        result = [];
    }
    for (var i = 0; i < length; i++) {
        if (Array.isArray(arr[i])) {
            this.flatten(arr[i], result);
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
volver() {
  this.router.navigate(['main']);
}
  refreshCache() {
    this.isLoading = true;
    this.dataSource = new MatTableDataSource([]);
    console.log('cargando centros');
    this.mService.getCentros()
    .subscribe(
      data => {
        console.log(data);

        /*if(data){

          for (let centro of data) {
            let c = [];
            c = ()centro,
            for(let cen of c){
              this.centros.push(centro);
            }

          }
        }*/
        //this.centros = data;
        let prueba: any[];
        this.flatten(data, prueba);
        prueba = Array.from(data[0]).slice();
        this.centros = [];
        this.centros = prueba.concat(data[1]);
        console.log(this.centros);

        this.dataSource = new MatTableDataSource(this.centros);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
        (data: Centro, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toString().toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
          };
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit() {
    this.refreshCache();

  }

  applyFilter(filterValue: string) {
    const tableFilters = [];

    tableFilters.push({
      id: 'centro',
      value: filterValue
    });



    this.dataSource.filter = JSON.stringify(tableFilters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

