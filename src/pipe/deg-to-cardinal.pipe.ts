import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degToCardinal'
})
export class DegToCardinalPipe implements PipeTransform {

  transform(value: any): any {
    let caridnals = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N' ];
    let idx = parseInt(Math.round((value % 360) / 45).toString(), 0);
    return caridnals[idx];
  }

}
