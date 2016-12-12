import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { OpenWeatherMapService } from './src/service/open-weather-map.service';
import { WeatherConfig } from './src/weather-config';
import { CurrentWeatherComponent, WeatherArroundComponent, WeatherPrevisionComponent } from './src/component/index';

import { MeterSecToKmHourPipe, RoundPipe, WeatherNameToIconPipe,
  DegToCompassPipe, DegToCardinalPipe, MomentFormatPipe } from './src/pipe/index';


export * from './src/weather-config';
export * from './src/component/index';
export * from './src/pipe/index';
export * from './src/service/classes';
export * from './src/service/open-weather-map.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    CurrentWeatherComponent,
    WeatherArroundComponent,
    WeatherPrevisionComponent,
    MeterSecToKmHourPipe,
    RoundPipe,
    WeatherNameToIconPipe,
    DegToCompassPipe,
    DegToCardinalPipe,
    MomentFormatPipe
  ],
  providers: [
    OpenWeatherMapService
  ],
  exports: [
    CurrentWeatherComponent,
    WeatherArroundComponent,
    WeatherPrevisionComponent,
    MeterSecToKmHourPipe,
    WeatherNameToIconPipe,
    RoundPipe,
    DegToCompassPipe,
    DegToCardinalPipe,
    MomentFormatPipe
  ]
})
export class WeatherModule {
  static forRoot(config: WeatherConfig): ModuleWithProviders {
    return {
      ngModule: WeatherModule,
      providers: [
        {provide: WeatherConfig, useValue: config }
      ]
    };
  }
}
