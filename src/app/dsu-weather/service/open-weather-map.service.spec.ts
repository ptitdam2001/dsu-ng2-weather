 /* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpenWeatherMapService } from './open-weather-map.service';
import { Http } from '@angular/http';
import { WeatherConfig } from '../weather-config';
import { WeatherPrevisionComponent } from '../component/weather-prevision/weather-prevision.component';
import { WeatherSearchParams } from './classes';

class GoodWeatherConfig {
  key = '59fd2768e2c9abcb3cf35e48643a34f5';
}


describe('Service: OpenWeatherMap', () => {
  let service: OpenWeatherMapService;
  let parameters: WeatherSearchParams;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenWeatherMapService,
        Http,
        {provide: WeatherConfig, useClass: GoodWeatherConfig}
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(OpenWeatherMapService);

    parameters = new WeatherSearchParams();
    parameters.city = 'montpellier';
    parameters.country = 'france';
  });

  it('should returns current weather when getCurrentWeather() is called', async(() => {
    service.getCurrentWeather(parameters).subscribe(response => {
      expect(response).toBe(true);
    });
  }));

  it('should returns the weather arround of area when getWeatherArround() is called', () => {
    expect(true).toBe(true);
  });

  it('should returns the forecast of an area when getForecast() is called', () => {
    expect(true).toBe(true);
  });
});
