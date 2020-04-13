import { Injectable, Inject } from '@angular/core';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root',
})
export class ErrorService{
    constructor(private utilservice: UtilService){}
    public show(errorMessage: string){

        this.utilservice.showSimpleMiddleToast(errorMessage, 3000, 'danger');
    }
}
