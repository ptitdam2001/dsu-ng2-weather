import { Http, URLSearchParams, Response } from '@angular/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { WeatherSearchParams, Coordinates } from './classes';
import { WeatherConfig } from '../weather-config';
import { Observable } from 'rxjs';

const API_URL = 'http://api.openweathermap.org/data/2.5/';

@Injectable()
export class OpenWeatherMapService {

  private url: string = API_URL + 'weather';
  private findUrl: string = API_URL + 'find';
  private forecastUrl: string = API_URL + 'forecast';

  private http: Http;
  private key: string;

  constructor(@Inject(Http) http: Http, @Optional() config: WeatherConfig) {
    this.http = http;
    if (config) {
      this.key = config.key;
    }
  }

  /**
   * Get the current weather
   * @params params WeatherSearchParams
   * @return Observable<Response>
   */
  getCurrentWeather(params: WeatherSearchParams): Observable<Response> {
    let options = params.toUrlSearchParams(this.key);
    return this.http.get(this.url, {search: options});
  }

  /**
   * Get the weather arround a given coordinate
   * @params coordinates Coordinates
   * @params count number
   * @params lang string
   * @return Observable<Response>
   */
  getWeatherArround(coordinates: Coordinates, count = 10, lang = 'en') {
    let params: URLSearchParams = new URLSearchParams();
    params.set('lon', coordinates.lon.toString());
    params.set('lat', coordinates.lat.toString());
    params.set('cnt', count.toString());
    params.set('appid', this.key);
    params.set('units', 'metric');
    params.set('lang', lang);

    return this.http.get(this.findUrl, {search: params});
  }

  /**
   * Get the weather forecast of a given area
   *
   * @params params WeatherSearchParams
   * @return Observable<Response>
   *
   */
  getForecast(params: WeatherSearchParams) {
    let options = params.toUrlSearchParams(this.key);
    return this.http.get(this.forecastUrl, {search: options});
  }
}
