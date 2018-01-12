import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meterSecToKmHour'
})
export class MeterSecToKmHourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
     /*
     m/sec => km/sec
     km/sec =>km/h
     */
    return (value / 1000) * 3600;
  }

}
