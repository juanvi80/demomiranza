import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'estado' })
export class EstadoPipe implements PipeTransform {
  transform(estado: string): string {
    switch (estado) {
      case 'PE': return 'Pendiente'; break;
      case 'EP': return 'Env.Parcialemnte'; break;
      case 'RE': return 'Recibido'; break;
      case 'AN': return 'Anulado'; break;
      default: return 'Error';
    }

    return 'KK';
  }
}
