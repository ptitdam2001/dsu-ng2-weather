import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OpenWeatherMapService } from '../../service/open-weather-map.service';
import { WeatherSearchParams, Coordinates } from '../../service/classes';

import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

// import * as template from './current-weather.component.html!Text';

@Component({
  selector: 'ngw-current-weather',
  // templateUrl: './current-weather.component.html',
  // template: template.default,
  template: `<div class="card">
      <div class="card-header">
        <div class="left-side">
          <h2 class="city">{{currentWeather?.name}}</h2>
          <span class="currently-weather">{{currentWeather?.weather[0]?.description}}</span>
          <div class="wind">
          <i class="wind-icon wi wi-strong-wind"></i>{{currentWeather?.wind?.speed | meterSecToKmHour | round}}<span class="mph">km/h</span>
          </div>
          <span class="temperature">{{currentWeather?.main?.temp | round}}°c</span>
        </div>
        <div class="weather-icon">
          <i class="wi {{currentWeather?.weather[0]?.id | weatherNameToIcon}}"></i>
        </div>
        <!--<div class="header-bg" style="background-image: url(img/san-francisco.jpg)"></div>-->
        <div class="clearfix"></div>
      </div>
    </div>`,
  // styleUrls: [
  //   './../../../../../node_modules/weather-icons/sass/weather-icons.scss',
  //   './current-weather.component.scss'
  // ],
  styles: [
    `:host {
      background-color: #fff;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      display: inline-block; }
      :host .col .weather-icon svg path, :host .col .weather-icon svg line {
        stroke: #BB5771; }
      :host svg {
        display: inline-block;
        width: 100%;
        height: auto; }
      :host .card-header {
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        min-height: 200px;
        z-index: 1;
        text-align: left;
        background-color: #3D6AA2; }
      :host .left-side {
        float: left;
        width: 60%; }
      :host h2.city {
        font-size: 1.2em;
        font-weight: 300;
        margin: 0 0 20px;
        position: relative; }
      :host h2.city:after {
        content: "";
        position: absolute;
        width: 20px;
        height: 2px;
        background-color: #fff;
        left: 0;
        bottom: -11px; }
      :host span.currently-weather {
        text-transform: uppercase;
        font-weight: 300;
        font-size: .8em; }
      :host .wind {
        font-size: .8em;
        font-weight: 300;
        line-height: 1em;
        margin-top: 5px; }
        :host .wind .wind-icon {
          display: inline-block;
          width: 20px;
          height: .8em;
          vertical-align: bottom;
          margin-right: 5px; }
      :host span.mph {
        font-size: .6em;
        margin-left: 3px;
        text-transform: uppercase;
        line-height: 1em; }
      :host span.temperature {
        font-size: 2em;
        font-weight: 100;
        margin-top: 1em;
        display: block;
        line-height: 1em; }
      :host .weather-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        width: 30%;
        transform: translateY(-50%); }
        :host .weather-icon i {
          font-size: 80px; }
      :host .header-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-position: center;
        background-size: cover;
        opacity: .1;
        z-index: -1; }
      :host .col {
        float: left;
        width: 33.33%;
        padding: 20px;
        box-sizing: border-box;
        text-align: center; }
      :host span.day {
        display: block;
        font-weight: 300;
        color: #888;
        text-transform: uppercase; }
      :host .col .weather-icon {
        position: relative;
        width: 100%;
        right: 0;
        top: 0;
        transform: none;
        margin: 20px 0 0; }
      :host .col .weather-icon svg {
        width: 80%;
        height: auto; }
      :host .col:nth-child(2) {
        border-width: 0 1px 0 1px;
        border-style: solid;
        border-color: #f9f9f9; }`
  ],
  providers: [
    OpenWeatherMapService
  ]
})
export class CurrentWeatherComponent implements OnInit, OnChanges {

  @Input() city: string;
  @Input() coordinates ?: Coordinates;
  @Input() refreshMin ?: number = 1;

  public currentWeather: any;

  constructor(private service: OpenWeatherMapService) { }

  ngOnInit() {
  }


  ngOnChanges(changes: any) {
    let options = new WeatherSearchParams();

    if (changes.city && changes.city.currentValue) {
      options.city = this.city;
    } else if (changes.coordinates && changes.coordinates.currentValue) {
      options.coordinates = this.coordinates;
    }

    if (options.city || options.coordinates) {
      // get data at first
      this.service.getCurrentWeather(options).subscribe(
        (response: any) => {
          this.currentWeather = response.json();
          this.populate(options);
        },
        (error: any) => {
          this.currentWeather = { weather: [] };
          this.populate(options);
        }
      );
    }
  }

  /**
   * function which gets the current weather each x minutes
   */
  private populate(options: WeatherSearchParams) {
    return Observable.interval(this.refreshMin * 60000)
      .flatMap(() => this.service.getCurrentWeather(options))
      .subscribe(
        (response: any) => this.currentWeather = response.json(),
        (error: any) => this.currentWeather = { weather: [] }
      );
  }
}
