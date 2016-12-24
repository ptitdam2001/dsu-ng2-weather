import { Forecast, ForecastItem } from '../../models/forecast';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OpenWeatherMapService } from '../../service/open-weather-map.service';
import { WeatherSearchParams, Coordinates } from '../../service/classes';
import * as moment from 'moment/moment';

import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

// import * as template from './weather-prevision.component.html!Text';

@Component({
  selector: 'ngw-weather-prevision',
  // templateUrl: './weather-prevision.component.html',
  // template: template.default,
  template: `
  <div class="title">Weather prevision</div>
  <div class="scroller" [ngStyle]="{'height': scrollStyle}">
    <ul *ngFor="let weather of weathers">
      <ol>{{weather.date}}</ol>
      <li *ngFor="let item of weather.list">
        <div class="hour">{{(item.dt * 1000) | momentFormat:'HH:mm'}}</div>
        <div class="icon">
          <ng2-wi [name]="item?.weather[0].id"></ng2-wi>
        </div>
        <div class="info">
          <p><span class="temp">{{item.main.temp_max}}°c</span>&nbsp;{{item.weather[0]?.description}}</p>
          <p>min : {{item.main.temp_min}}°c - max : {{item.main.temp_max}}°c</p>
          <p>wind: {{item.wind.speed}} m/sec</p>
          <p>Humidity: {{item.main.humidity}}%</p>
          <p *ngIf="item.rain && item.rain['3h']">Rain volume: {{item.rain['3h']}} mm</p>
          <p *ngIf="item.snow && item.snow['3h']">Snow volume: {{item.snow['3h']}}</p>
        </div>
      </li>
    </ul>
  </div>`,
  // styleUrls: [
  //   './weather-prevision.component.scss'
  // ],
  styles: [
    `:host {
      background: #fff;
      width: 100%;
      border-radius: 5px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      display: block; }
      :host .title {
        display: block;
        height: 30px;
        line-height: 30px;
        padding: 10px;
        font-weight: bold;
        background: #3D6AA2;
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px; }
      :host .scroller {
        height: 300px;
        overflow-y: scroll; }
        :host .scroller ul {
          padding: 0;
          margin: 0; }
          :host .scroller ul ol, :host .scroller ul li {
            min-height: 35px;
            line-height: 35px; }
          :host .scroller ul ol {
            background: #555555;
            color: #ffffff;
            padding: 5px 10px; }
          :host .scroller ul li {
            list-style: none;
            border-top: 1px solid #999999;
            display: flex;
            flex-direction: row; }
            :host .scroller ul li .hour {
              width: 10%;
              padding: 0 5px;
              font-weight: bold;
              font-size: 1.1em;
              text-align: center; }
            :host .scroller ul li .icon {
              width: 10%; }
              :host .scroller ul li .icon i {
                font-size: 200%;
                display: block;
                height: 100%;
                padding: 10%;
                line-height: 90%; }
              :host .scroller ul li .icon i:hover {
                color: red; }
            :host .scroller ul li .info {
              width: 80%;
              padding: 5px; }
              :host .scroller ul li .info .temp {
                display: inline-block;
                background: orange;
                border-radius: 3px;
                padding: 1px 3px; }
              :host .scroller ul li .info p {
                padding: 0;
                margin: 3px 0; }
            :host .scroller ul li .left {
              width: 80%;
              display: flex; }
          :host .scroller ul li:first-child {
            border-top: none; }`
  ],
  providers: [
    OpenWeatherMapService
  ]
})
export class WeatherPrevisionComponent implements OnInit, OnChanges {

  @Input() city: string;
  @Input() coordinates ?: Coordinates;
  @Input() height ?: number = 300;
  @Input() refreshMin ?: number = 1;
  @Input() lang ?: string = 'en';

  public weathers: Array<any>;
  private scrollStyle: string;

  constructor(private service: OpenWeatherMapService) { }

  ngOnInit() {
    this.scrollStyle = (this.height - 30) + 'px' ;
  }

  ngOnChanges(changes: any) {
    let options = new WeatherSearchParams();

    if (changes.lang && changes.lang.currentValue) {
      options.lang = this.lang;
    }

    if (changes.city && changes.city.currentValue) {
      options.city = this.city;
    } else if (changes.coordinates && changes.coordinates.currentValue) {
      options.coordinates = this.coordinates;
    }
    if (options.coordinates || options.coordinates) {
      this.getObservableFlow(options).subscribe(
        response => this._populateForecast(response),
        error => this._populateForecast([])
      );
      this.populate(options);
    }
  }

  private _populateForecast(data: Array<any>) {
    let forecastF: Array<Forecast> = new Array();

    for (let elt of data) {
      if (forecastF.length === 0) {
        let add = new Forecast(elt.date);
        add.addToList(elt);
        forecastF[forecastF.length] = add;
      }

      if (forecastF.length > 0) {
        let found = forecastF.find(predicate => elt.date === predicate.date);
        let foundIndex = forecastF.findIndex(predicate => elt.date === predicate.date);

        if (found) {
          found.addToList(elt);
          forecastF[foundIndex] = found;
        } else {
          let add = new Forecast(elt.date);
          add.addToList(elt);
          forecastF[forecastF.length] = add;
        }
      }
    }

    this.weathers = forecastF;
  }

  private getObservableFlow(options: WeatherSearchParams) {
    return this.service.getForecast(options)
      .map(response => {
        return response.json().list.map( (item: any) => {
          let ret = item as ForecastItem;
          ret.date = moment(ret.dt * 1000).format('YYYY-MM-DD');
          return ret;
        });
      });
  }

  private populate(options: WeatherSearchParams) {
    this.weathers = [];

    return Observable
      .interval(this.refreshMin * 60000)
      .flatMap(() => this.getObservableFlow(options))
      .subscribe(response => this._populateForecast(response));
  }
}
