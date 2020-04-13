import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logincliente } from '../models/logincliente';
import { Subject, Observable } from 'rxjs';
import { CacheLocalStorageResponse } from './cache.service';
import { Centro } from '../models/centro';
import { Paciente } from '../models/paciente';
import { Citas } from '../models/citas';

@Injectable({
    providedIn: 'root',
})
export class MaestroService {
    constructor(private http: HttpClient) {
        this.cache = new CacheLocalStorageResponse('MIRANZA');
    }


    private lclienteSel: Logincliente;
    private pacienteSel: Paciente;

     CACHE_MAESTROS_PACIENTE_SEL = 'MPACIENTESEL';
     CACHE_MAESTROS_CENTRO = 'MCENTROS';
     CACHE_MAESTROS_PACIENTES = 'MPACIENTE';
     CACHE_MAESTROS_CITAS = 'MCITAS';


    private centros: Centro[];
    private pacientes: Paciente[];
    private paciente: Paciente;
    private citas: Citas[];

    cache: CacheLocalStorageResponse;


    getCentros(): Observable<any[]>  {
        return this.http.get<any[]>('/centros');
     }

     getPacientes(): Observable<any[]>  {
      return this.http.get<any[]>('/pacientes');
   }

   getCitasByPaciente(cif: string): Observable<any[]>  {
    return this.http.get<any[]>('/pacientescif/citasbypaciente?cif=' + cif );
 }

     getMaestros() {
     }




}
