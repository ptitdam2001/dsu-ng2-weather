import { OpenWeatherMapService } from '../../service/open-weather-map.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Coordinates } from '../../service/classes';

// import * as template from './weather-arround.component.html!Text';

@Component({
  selector: 'ngw-weather-arround',
  // templateUrl: './weather-arround.component.html',
  // template: template.default,
  template: `
  <div>
    <div class="title">Arround</div>
    <div class="card-list" [ngStyle]="listStyle" *ngIf="errorService == false">
      <div *ngFor="let weather of weatherArround" class="card-list-item">
        <h2>{{weather?.name}}</h2>
        <div class="card-content">
          <div class="description">
            <span class="currently-weather">{{weather?.weather[0].description}}</span>
            <div class="wind">
              <i class="wind-icon wi wi-strong-wind"></i>{{weather?.wind.speed | meterSecToKmHour | round}}<span class="mph">km/h</span>
            </div>
            <span class="temperature">{{weather?.main.temp | round}}°c</span>
          </div>
          <div class="weather-icon">
            <i class="wi {{weather?.weather[0].id | weatherNameToIcon}}"></i>
          </div>
        </div>
    </div>
    <div *ngIf="errorService == true">
      <p>Provider does not answer</p>
      <p>
        <a (click)="reload()" class="btn refresh">Refresh</a>
      </p>
    </div>
  </div>`,
  // styleUrls: [
  //   './../../../../../node_modules/weather-icons/sass/weather-icons.scss',
  //   './weather-arround.component.scss'
  //   ]
  styles: [
    `:host {
      width: 100%;
      border-radius: 5px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      display: block;
      background: #fff; }
      :host .card-list {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow-y: scroll; }
        :host .card-list .card-list-item {
          display: block;
          padding: 10px; }
          :host .card-list .card-list-item h2 {
            text-align: left;
            font-weight: bold;
            font-size: .9em;
            margin-top: 0; }
          :host .card-list .card-list-item .card-content {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #ababab; }
            :host .card-list .card-list-item .card-content .description {
              width: 50%;
              font-size: .8em; }
              :host .card-list .card-list-item .card-content .description .wind .wind-icon {
                padding-right: 5px; }
              :host .card-list .card-list-item .card-content .description .temperature {
                font-size: 2em;
                font-weight: 100;
                margin-top: .5em;
                margin-bottom: .5em;
                display: block;
                line-height: 1em; }
            :host .card-list .card-list-item .card-content .weather-icon {
              width: 50%;
              text-align: center;
              font-size: 50px;
              padding: 10px 5px; }
      :host .title {
        height: 30px;
        line-height: 30px;
        display: block;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        background: #3D6AA2;
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px; }`
  ]
})
export class WeatherArroundComponent implements OnInit, OnChanges {

  @Input() coordinates: Coordinates;
  @Input() height ?: number = 0;

  private weatherArround: Array<any>;
  private listStyle: any;
  private errorService: boolean = false;

  constructor(private service: OpenWeatherMapService) { }

  ngOnInit() {

    this.listStyle = this.height > 0 ? {'height': (this.height - 30) + 'px'} : {};
  }

  ngOnChanges(changes: any) {
    if (changes.coordinates.currentValue) {
      this.populate();
    }
  }

  private populate() {
    this.service.getWeatherArround(this.coordinates).subscribe(
      response => this.weatherArround = response.json().list ? response.json().list : [],
      error => {
        this.weatherArround = [];
        this.errorService = true;
      }
    );
  }

  public reload() {
    this.populate();
  }

}
