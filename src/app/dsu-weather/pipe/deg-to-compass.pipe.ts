import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degToCompass'
})
export class DegToCompassPipe implements PipeTransform {

  transform(value: any): string {
    let val = parseInt( ((value / 22.5) + .5).toString(), 0);

    let arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

    return arr[(val % 16)];
  }

}
