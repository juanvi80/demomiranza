import { Inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
  })
export class UtilService {
    constructor(private _snackBar: MatSnackBar) {}
    pushToArray(arr, obj): any {
        const index = arr.findIndex((e) => e.id === obj.id);
        if (index === -1) {
           return arr.concat(obj);
        } else {
            arr[index] = obj;
        }

        return arr.concat();
    }
    deleteToArray(arr, id): any {
        const index = arr.findIndex((e) => e.id === id);


        if (index !== -1) {

            arr.splice(index, 1 );
        }

        return arr.concat();
    }
    public async  showSimpleMiddleToast(message: string, duration2: number, color: string) {
         this._snackBar.open( message, '',{
          announcementMessage: ' ',
          data: {},
          duration: duration2,
          }
        );
        //toast.present();
      }

      public async showSimpleBottomToast(message: string, duration: number) {
        /*const toast = await this.toastController.create({
          message,
          duration,
          position: 'bottom'
        });
        toast.present();*/
      }

}
