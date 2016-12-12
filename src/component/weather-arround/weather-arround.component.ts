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
    `@charset "UTF-8";
:host {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: block;
  background: #fff; }
@font-face {
  :host {
    font-family: "weathericons";
    src: url("../font/weathericons-regular-webfont.eot");
    src: url("../font/weathericons-regular-webfont.eot?#iefix") format("embedded-opentype"), url("../font/weathericons-regular-webfont.woff2") format("woff2"), url("../font/weathericons-regular-webfont.woff") format("woff"), url("../font/weathericons-regular-webfont.ttf") format("truetype"), url("../font/weathericons-regular-webfont.svg#weather_iconsregular") format("svg");
    font-weight: normal;
    font-style: normal; } }
  :host .wi {
    display: inline-block;
    font-family: "weathericons";
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; }
  :host .wi-fw {
    width: 1.4em;
    text-align: center; }
  :host .wi-rotate-90 {
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg); }
  :host .wi-rotate-180 {
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg); }
  :host .wi-rotate-270 {
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg); }
  :host .wi-flip-horizontal {
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0);
    -webkit-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1); }
  :host .wi-flip-vertical {
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
    -webkit-transform: scale(1, -1);
    -ms-transform: scale(1, -1);
    transform: scale(1, -1); }
  :host .wi-day-sunny:before {
    content: ""; }
  :host .wi-day-cloudy:before {
    content: ""; }
  :host .wi-day-cloudy-gusts:before {
    content: ""; }
  :host .wi-day-cloudy-windy:before {
    content: ""; }
  :host .wi-day-fog:before {
    content: ""; }
  :host .wi-day-hail:before {
    content: ""; }
  :host .wi-day-haze:before {
    content: ""; }
  :host .wi-day-lightning:before {
    content: ""; }
  :host .wi-day-rain:before {
    content: ""; }
  :host .wi-day-rain-mix:before {
    content: ""; }
  :host .wi-day-rain-wind:before {
    content: ""; }
  :host .wi-day-showers:before {
    content: ""; }
  :host .wi-day-sleet:before {
    content: ""; }
  :host .wi-day-sleet-storm:before {
    content: ""; }
  :host .wi-day-snow:before {
    content: ""; }
  :host .wi-day-snow-thunderstorm:before {
    content: ""; }
  :host .wi-day-snow-wind:before {
    content: ""; }
  :host .wi-day-sprinkle:before {
    content: ""; }
  :host .wi-day-storm-showers:before {
    content: ""; }
  :host .wi-day-sunny-overcast:before {
    content: ""; }
  :host .wi-day-thunderstorm:before {
    content: ""; }
  :host .wi-day-windy:before {
    content: ""; }
  :host .wi-solar-eclipse:before {
    content: ""; }
  :host .wi-hot:before {
    content: ""; }
  :host .wi-day-cloudy-high:before {
    content: ""; }
  :host .wi-day-light-wind:before {
    content: ""; }
  :host .wi-night-clear:before {
    content: ""; }
  :host .wi-night-alt-cloudy:before {
    content: ""; }
  :host .wi-night-alt-cloudy-gusts:before {
    content: ""; }
  :host .wi-night-alt-cloudy-windy:before {
    content: ""; }
  :host .wi-night-alt-hail:before {
    content: ""; }
  :host .wi-night-alt-lightning:before {
    content: ""; }
  :host .wi-night-alt-rain:before {
    content: ""; }
  :host .wi-night-alt-rain-mix:before {
    content: ""; }
  :host .wi-night-alt-rain-wind:before {
    content: ""; }
  :host .wi-night-alt-showers:before {
    content: ""; }
  :host .wi-night-alt-sleet:before {
    content: ""; }
  :host .wi-night-alt-sleet-storm:before {
    content: ""; }
  :host .wi-night-alt-snow:before {
    content: ""; }
  :host .wi-night-alt-snow-thunderstorm:before {
    content: ""; }
  :host .wi-night-alt-snow-wind:before {
    content: ""; }
  :host .wi-night-alt-sprinkle:before {
    content: ""; }
  :host .wi-night-alt-storm-showers:before {
    content: ""; }
  :host .wi-night-alt-thunderstorm:before {
    content: ""; }
  :host .wi-night-cloudy:before {
    content: ""; }
  :host .wi-night-cloudy-gusts:before {
    content: ""; }
  :host .wi-night-cloudy-windy:before {
    content: ""; }
  :host .wi-night-fog:before {
    content: ""; }
  :host .wi-night-hail:before {
    content: ""; }
  :host .wi-night-lightning:before {
    content: ""; }
  :host .wi-night-partly-cloudy:before {
    content: ""; }
  :host .wi-night-rain:before {
    content: ""; }
  :host .wi-night-rain-mix:before {
    content: ""; }
  :host .wi-night-rain-wind:before {
    content: ""; }
  :host .wi-night-showers:before {
    content: ""; }
  :host .wi-night-sleet:before {
    content: ""; }
  :host .wi-night-sleet-storm:before {
    content: ""; }
  :host .wi-night-snow:before {
    content: ""; }
  :host .wi-night-snow-thunderstorm:before {
    content: ""; }
  :host .wi-night-snow-wind:before {
    content: ""; }
  :host .wi-night-sprinkle:before {
    content: ""; }
  :host .wi-night-storm-showers:before {
    content: ""; }
  :host .wi-night-thunderstorm:before {
    content: ""; }
  :host .wi-lunar-eclipse:before {
    content: ""; }
  :host .wi-stars:before {
    content: ""; }
  :host .wi-storm-showers:before {
    content: ""; }
  :host .wi-thunderstorm:before {
    content: ""; }
  :host .wi-night-alt-cloudy-high:before {
    content: ""; }
  :host .wi-night-cloudy-high:before {
    content: ""; }
  :host .wi-night-alt-partly-cloudy:before {
    content: ""; }
  :host .wi-cloud:before {
    content: ""; }
  :host .wi-cloudy:before {
    content: ""; }
  :host .wi-cloudy-gusts:before {
    content: ""; }
  :host .wi-cloudy-windy:before {
    content: ""; }
  :host .wi-fog:before {
    content: ""; }
  :host .wi-hail:before {
    content: ""; }
  :host .wi-rain:before {
    content: ""; }
  :host .wi-rain-mix:before {
    content: ""; }
  :host .wi-rain-wind:before {
    content: ""; }
  :host .wi-showers:before {
    content: ""; }
  :host .wi-sleet:before {
    content: ""; }
  :host .wi-snow:before {
    content: ""; }
  :host .wi-sprinkle:before {
    content: ""; }
  :host .wi-storm-showers:before {
    content: ""; }
  :host .wi-thunderstorm:before {
    content: ""; }
  :host .wi-snow-wind:before {
    content: ""; }
  :host .wi-snow:before {
    content: ""; }
  :host .wi-smog:before {
    content: ""; }
  :host .wi-smoke:before {
    content: ""; }
  :host .wi-lightning:before {
    content: ""; }
  :host .wi-raindrops:before {
    content: ""; }
  :host .wi-raindrop:before {
    content: ""; }
  :host .wi-dust:before {
    content: ""; }
  :host .wi-snowflake-cold:before {
    content: ""; }
  :host .wi-windy:before {
    content: ""; }
  :host .wi-strong-wind:before {
    content: ""; }
  :host .wi-sandstorm:before {
    content: ""; }
  :host .wi-earthquake:before {
    content: ""; }
  :host .wi-fire:before {
    content: ""; }
  :host .wi-flood:before {
    content: ""; }
  :host .wi-meteor:before {
    content: ""; }
  :host .wi-tsunami:before {
    content: ""; }
  :host .wi-volcano:before {
    content: ""; }
  :host .wi-hurricane:before {
    content: ""; }
  :host .wi-tornado:before {
    content: ""; }
  :host .wi-small-craft-advisory:before {
    content: ""; }
  :host .wi-gale-warning:before {
    content: ""; }
  :host .wi-storm-warning:before {
    content: ""; }
  :host .wi-hurricane-warning:before {
    content: ""; }
  :host .wi-wind-direction:before {
    content: ""; }
  :host .wi-alien:before {
    content: ""; }
  :host .wi-celsius:before {
    content: ""; }
  :host .wi-fahrenheit:before {
    content: ""; }
  :host .wi-degrees:before {
    content: ""; }
  :host .wi-thermometer:before {
    content: ""; }
  :host .wi-thermometer-exterior:before {
    content: ""; }
  :host .wi-thermometer-internal:before {
    content: ""; }
  :host .wi-cloud-down:before {
    content: ""; }
  :host .wi-cloud-up:before {
    content: ""; }
  :host .wi-cloud-refresh:before {
    content: ""; }
  :host .wi-horizon:before {
    content: ""; }
  :host .wi-horizon-alt:before {
    content: ""; }
  :host .wi-sunrise:before {
    content: ""; }
  :host .wi-sunset:before {
    content: ""; }
  :host .wi-moonrise:before {
    content: ""; }
  :host .wi-moonset:before {
    content: ""; }
  :host .wi-refresh:before {
    content: ""; }
  :host .wi-refresh-alt:before {
    content: ""; }
  :host .wi-umbrella:before {
    content: ""; }
  :host .wi-barometer:before {
    content: ""; }
  :host .wi-humidity:before {
    content: ""; }
  :host .wi-na:before {
    content: ""; }
  :host .wi-train:before {
    content: ""; }
  :host .wi-moon-new:before {
    content: ""; }
  :host .wi-moon-waxing-crescent-1:before {
    content: ""; }
  :host .wi-moon-waxing-crescent-2:before {
    content: ""; }
  :host .wi-moon-waxing-crescent-3:before {
    content: ""; }
  :host .wi-moon-waxing-crescent-4:before {
    content: ""; }
  :host .wi-moon-waxing-crescent-5:before {
    content: ""; }
  :host .wi-moon-waxing-crescent-6:before {
    content: ""; }
  :host .wi-moon-first-quarter:before {
    content: ""; }
  :host .wi-moon-waxing-gibbous-1:before {
    content: ""; }
  :host .wi-moon-waxing-gibbous-2:before {
    content: ""; }
  :host .wi-moon-waxing-gibbous-3:before {
    content: ""; }
  :host .wi-moon-waxing-gibbous-4:before {
    content: ""; }
  :host .wi-moon-waxing-gibbous-5:before {
    content: ""; }
  :host .wi-moon-waxing-gibbous-6:before {
    content: ""; }
  :host .wi-moon-full:before {
    content: ""; }
  :host .wi-moon-waning-gibbous-1:before {
    content: ""; }
  :host .wi-moon-waning-gibbous-2:before {
    content: ""; }
  :host .wi-moon-waning-gibbous-3:before {
    content: ""; }
  :host .wi-moon-waning-gibbous-4:before {
    content: ""; }
  :host .wi-moon-waning-gibbous-5:before {
    content: ""; }
  :host .wi-moon-waning-gibbous-6:before {
    content: ""; }
  :host .wi-moon-third-quarter:before {
    content: ""; }
  :host .wi-moon-waning-crescent-1:before {
    content: ""; }
  :host .wi-moon-waning-crescent-2:before {
    content: ""; }
  :host .wi-moon-waning-crescent-3:before {
    content: ""; }
  :host .wi-moon-waning-crescent-4:before {
    content: ""; }
  :host .wi-moon-waning-crescent-5:before {
    content: ""; }
  :host .wi-moon-waning-crescent-6:before {
    content: ""; }
  :host .wi-moon-alt-new:before {
    content: ""; }
  :host .wi-moon-alt-waxing-crescent-1:before {
    content: ""; }
  :host .wi-moon-alt-waxing-crescent-2:before {
    content: ""; }
  :host .wi-moon-alt-waxing-crescent-3:before {
    content: ""; }
  :host .wi-moon-alt-waxing-crescent-4:before {
    content: ""; }
  :host .wi-moon-alt-waxing-crescent-5:before {
    content: ""; }
  :host .wi-moon-alt-waxing-crescent-6:before {
    content: ""; }
  :host .wi-moon-alt-first-quarter:before {
    content: ""; }
  :host .wi-moon-alt-waxing-gibbous-1:before {
    content: ""; }
  :host .wi-moon-alt-waxing-gibbous-2:before {
    content: ""; }
  :host .wi-moon-alt-waxing-gibbous-3:before {
    content: ""; }
  :host .wi-moon-alt-waxing-gibbous-4:before {
    content: ""; }
  :host .wi-moon-alt-waxing-gibbous-5:before {
    content: ""; }
  :host .wi-moon-alt-waxing-gibbous-6:before {
    content: ""; }
  :host .wi-moon-alt-full:before {
    content: ""; }
  :host .wi-moon-alt-waning-gibbous-1:before {
    content: ""; }
  :host .wi-moon-alt-waning-gibbous-2:before {
    content: ""; }
  :host .wi-moon-alt-waning-gibbous-3:before {
    content: ""; }
  :host .wi-moon-alt-waning-gibbous-4:before {
    content: ""; }
  :host .wi-moon-alt-waning-gibbous-5:before {
    content: ""; }
  :host .wi-moon-alt-waning-gibbous-6:before {
    content: ""; }
  :host .wi-moon-alt-third-quarter:before {
    content: ""; }
  :host .wi-moon-alt-waning-crescent-1:before {
    content: ""; }
  :host .wi-moon-alt-waning-crescent-2:before {
    content: ""; }
  :host .wi-moon-alt-waning-crescent-3:before {
    content: ""; }
  :host .wi-moon-alt-waning-crescent-4:before {
    content: ""; }
  :host .wi-moon-alt-waning-crescent-5:before {
    content: ""; }
  :host .wi-moon-alt-waning-crescent-6:before {
    content: ""; }
  :host .wi-moon-0:before {
    content: ""; }
  :host .wi-moon-1:before {
    content: ""; }
  :host .wi-moon-2:before {
    content: ""; }
  :host .wi-moon-3:before {
    content: ""; }
  :host .wi-moon-4:before {
    content: ""; }
  :host .wi-moon-5:before {
    content: ""; }
  :host .wi-moon-6:before {
    content: ""; }
  :host .wi-moon-7:before {
    content: ""; }
  :host .wi-moon-8:before {
    content: ""; }
  :host .wi-moon-9:before {
    content: ""; }
  :host .wi-moon-10:before {
    content: ""; }
  :host .wi-moon-11:before {
    content: ""; }
  :host .wi-moon-12:before {
    content: ""; }
  :host .wi-moon-13:before {
    content: ""; }
  :host .wi-moon-14:before {
    content: ""; }
  :host .wi-moon-15:before {
    content: ""; }
  :host .wi-moon-16:before {
    content: ""; }
  :host .wi-moon-17:before {
    content: ""; }
  :host .wi-moon-18:before {
    content: ""; }
  :host .wi-moon-19:before {
    content: ""; }
  :host .wi-moon-20:before {
    content: ""; }
  :host .wi-moon-21:before {
    content: ""; }
  :host .wi-moon-22:before {
    content: ""; }
  :host .wi-moon-23:before {
    content: ""; }
  :host .wi-moon-24:before {
    content: ""; }
  :host .wi-moon-25:before {
    content: ""; }
  :host .wi-moon-26:before {
    content: ""; }
  :host .wi-moon-27:before {
    content: ""; }
  :host .wi-time-1:before {
    content: ""; }
  :host .wi-time-2:before {
    content: ""; }
  :host .wi-time-3:before {
    content: ""; }
  :host .wi-time-4:before {
    content: ""; }
  :host .wi-time-5:before {
    content: ""; }
  :host .wi-time-6:before {
    content: ""; }
  :host .wi-time-7:before {
    content: ""; }
  :host .wi-time-8:before {
    content: ""; }
  :host .wi-time-9:before {
    content: ""; }
  :host .wi-time-10:before {
    content: ""; }
  :host .wi-time-11:before {
    content: ""; }
  :host .wi-time-12:before {
    content: ""; }
  :host .wi-direction-up:before {
    content: ""; }
  :host .wi-direction-up-right:before {
    content: ""; }
  :host .wi-direction-right:before {
    content: ""; }
  :host .wi-direction-down-right:before {
    content: ""; }
  :host .wi-direction-down:before {
    content: ""; }
  :host .wi-direction-down-left:before {
    content: ""; }
  :host .wi-direction-left:before {
    content: ""; }
  :host .wi-direction-up-left:before {
    content: ""; }
  :host .wi-wind-beaufort-0:before {
    content: ""; }
  :host .wi-wind-beaufort-1:before {
    content: ""; }
  :host .wi-wind-beaufort-2:before {
    content: ""; }
  :host .wi-wind-beaufort-3:before {
    content: ""; }
  :host .wi-wind-beaufort-4:before {
    content: ""; }
  :host .wi-wind-beaufort-5:before {
    content: ""; }
  :host .wi-wind-beaufort-6:before {
    content: ""; }
  :host .wi-wind-beaufort-7:before {
    content: ""; }
  :host .wi-wind-beaufort-8:before {
    content: ""; }
  :host .wi-wind-beaufort-9:before {
    content: ""; }
  :host .wi-wind-beaufort-10:before {
    content: ""; }
  :host .wi-wind-beaufort-11:before {
    content: ""; }
  :host .wi-wind-beaufort-12:before {
    content: ""; }
  :host .wi-yahoo-0:before {
    content: ""; }
  :host .wi-yahoo-1:before {
    content: ""; }
  :host .wi-yahoo-2:before {
    content: ""; }
  :host .wi-yahoo-3:before {
    content: ""; }
  :host .wi-yahoo-4:before {
    content: ""; }
  :host .wi-yahoo-5:before {
    content: ""; }
  :host .wi-yahoo-6:before {
    content: ""; }
  :host .wi-yahoo-7:before {
    content: ""; }
  :host .wi-yahoo-8:before {
    content: ""; }
  :host .wi-yahoo-9:before {
    content: ""; }
  :host .wi-yahoo-10:before {
    content: ""; }
  :host .wi-yahoo-11:before {
    content: ""; }
  :host .wi-yahoo-12:before {
    content: ""; }
  :host .wi-yahoo-13:before {
    content: ""; }
  :host .wi-yahoo-14:before {
    content: ""; }
  :host .wi-yahoo-15:before {
    content: ""; }
  :host .wi-yahoo-16:before {
    content: ""; }
  :host .wi-yahoo-17:before {
    content: ""; }
  :host .wi-yahoo-18:before {
    content: ""; }
  :host .wi-yahoo-19:before {
    content: ""; }
  :host .wi-yahoo-20:before {
    content: ""; }
  :host .wi-yahoo-21:before {
    content: ""; }
  :host .wi-yahoo-22:before {
    content: ""; }
  :host .wi-yahoo-23:before {
    content: ""; }
  :host .wi-yahoo-24:before {
    content: ""; }
  :host .wi-yahoo-25:before {
    content: ""; }
  :host .wi-yahoo-26:before {
    content: ""; }
  :host .wi-yahoo-27:before {
    content: ""; }
  :host .wi-yahoo-28:before {
    content: ""; }
  :host .wi-yahoo-29:before {
    content: ""; }
  :host .wi-yahoo-30:before {
    content: ""; }
  :host .wi-yahoo-31:before {
    content: ""; }
  :host .wi-yahoo-32:before {
    content: ""; }
  :host .wi-yahoo-33:before {
    content: ""; }
  :host .wi-yahoo-34:before {
    content: ""; }
  :host .wi-yahoo-35:before {
    content: ""; }
  :host .wi-yahoo-36:before {
    content: ""; }
  :host .wi-yahoo-37:before {
    content: ""; }
  :host .wi-yahoo-38:before {
    content: ""; }
  :host .wi-yahoo-39:before {
    content: ""; }
  :host .wi-yahoo-40:before {
    content: ""; }
  :host .wi-yahoo-41:before {
    content: ""; }
  :host .wi-yahoo-42:before {
    content: ""; }
  :host .wi-yahoo-43:before {
    content: ""; }
  :host .wi-yahoo-44:before {
    content: ""; }
  :host .wi-yahoo-45:before {
    content: ""; }
  :host .wi-yahoo-46:before {
    content: ""; }
  :host .wi-yahoo-47:before {
    content: ""; }
  :host .wi-yahoo-3200:before {
    content: ""; }
  :host .wi-forecast-io-clear-day:before {
    content: ""; }
  :host .wi-forecast-io-clear-night:before {
    content: ""; }
  :host .wi-forecast-io-rain:before {
    content: ""; }
  :host .wi-forecast-io-snow:before {
    content: ""; }
  :host .wi-forecast-io-sleet:before {
    content: ""; }
  :host .wi-forecast-io-wind:before {
    content: ""; }
  :host .wi-forecast-io-fog:before {
    content: ""; }
  :host .wi-forecast-io-cloudy:before {
    content: ""; }
  :host .wi-forecast-io-partly-cloudy-day:before {
    content: ""; }
  :host .wi-forecast-io-partly-cloudy-night:before {
    content: ""; }
  :host .wi-forecast-io-hail:before {
    content: ""; }
  :host .wi-forecast-io-thunderstorm:before {
    content: ""; }
  :host .wi-forecast-io-tornado:before {
    content: ""; }
  :host .wi-wmo4680-0:before,
  :host .wi-wmo4680-00:before {
    content: ""; }
  :host .wi-wmo4680-1:before,
  :host .wi-wmo4680-01:before {
    content: ""; }
  :host .wi-wmo4680-2:before,
  :host .wi-wmo4680-02:before {
    content: ""; }
  :host .wi-wmo4680-3:before,
  :host .wi-wmo4680-03:before {
    content: ""; }
  :host .wi-wmo4680-4:before,
  :host .wi-wmo4680-04:before {
    content: ""; }
  :host .wi-wmo4680-5:before,
  :host .wi-wmo4680-05:before {
    content: ""; }
  :host .wi-wmo4680-10:before {
    content: ""; }
  :host .wi-wmo4680-11:before {
    content: ""; }
  :host .wi-wmo4680-12:before {
    content: ""; }
  :host .wi-wmo4680-18:before {
    content: ""; }
  :host .wi-wmo4680-20:before {
    content: ""; }
  :host .wi-wmo4680-21:before {
    content: ""; }
  :host .wi-wmo4680-22:before {
    content: ""; }
  :host .wi-wmo4680-23:before {
    content: ""; }
  :host .wi-wmo4680-24:before {
    content: ""; }
  :host .wi-wmo4680-25:before {
    content: ""; }
  :host .wi-wmo4680-26:before {
    content: ""; }
  :host .wi-wmo4680-27:before {
    content: ""; }
  :host .wi-wmo4680-28:before {
    content: ""; }
  :host .wi-wmo4680-29:before {
    content: ""; }
  :host .wi-wmo4680-30:before {
    content: ""; }
  :host .wi-wmo4680-31:before {
    content: ""; }
  :host .wi-wmo4680-32:before {
    content: ""; }
  :host .wi-wmo4680-33:before {
    content: ""; }
  :host .wi-wmo4680-34:before {
    content: ""; }
  :host .wi-wmo4680-35:before {
    content: ""; }
  :host .wi-wmo4680-40:before {
    content: ""; }
  :host .wi-wmo4680-41:before {
    content: ""; }
  :host .wi-wmo4680-42:before {
    content: ""; }
  :host .wi-wmo4680-43:before {
    content: ""; }
  :host .wi-wmo4680-44:before {
    content: ""; }
  :host .wi-wmo4680-45:before {
    content: ""; }
  :host .wi-wmo4680-46:before {
    content: ""; }
  :host .wi-wmo4680-47:before {
    content: ""; }
  :host .wi-wmo4680-48:before {
    content: ""; }
  :host .wi-wmo4680-50:before {
    content: ""; }
  :host .wi-wmo4680-51:before {
    content: ""; }
  :host .wi-wmo4680-52:before {
    content: ""; }
  :host .wi-wmo4680-53:before {
    content: ""; }
  :host .wi-wmo4680-54:before {
    content: ""; }
  :host .wi-wmo4680-55:before {
    content: ""; }
  :host .wi-wmo4680-56:before {
    content: ""; }
  :host .wi-wmo4680-57:before {
    content: ""; }
  :host .wi-wmo4680-58:before {
    content: ""; }
  :host .wi-wmo4680-60:before {
    content: ""; }
  :host .wi-wmo4680-61:before {
    content: ""; }
  :host .wi-wmo4680-62:before {
    content: ""; }
  :host .wi-wmo4680-63:before {
    content: ""; }
  :host .wi-wmo4680-64:before {
    content: ""; }
  :host .wi-wmo4680-65:before {
    content: ""; }
  :host .wi-wmo4680-66:before {
    content: ""; }
  :host .wi-wmo4680-67:before {
    content: ""; }
  :host .wi-wmo4680-68:before {
    content: ""; }
  :host .wi-wmo4680-70:before {
    content: ""; }
  :host .wi-wmo4680-71:before {
    content: ""; }
  :host .wi-wmo4680-72:before {
    content: ""; }
  :host .wi-wmo4680-73:before {
    content: ""; }
  :host .wi-wmo4680-74:before {
    content: ""; }
  :host .wi-wmo4680-75:before {
    content: ""; }
  :host .wi-wmo4680-76:before {
    content: ""; }
  :host .wi-wmo4680-77:before {
    content: ""; }
  :host .wi-wmo4680-78:before {
    content: ""; }
  :host .wi-wmo4680-80:before {
    content: ""; }
  :host .wi-wmo4680-81:before {
    content: ""; }
  :host .wi-wmo4680-82:before {
    content: ""; }
  :host .wi-wmo4680-83:before {
    content: ""; }
  :host .wi-wmo4680-84:before {
    content: ""; }
  :host .wi-wmo4680-85:before {
    content: ""; }
  :host .wi-wmo4680-86:before {
    content: ""; }
  :host .wi-wmo4680-87:before {
    content: ""; }
  :host .wi-wmo4680-89:before {
    content: ""; }
  :host .wi-wmo4680-90:before {
    content: ""; }
  :host .wi-wmo4680-91:before {
    content: ""; }
  :host .wi-wmo4680-92:before {
    content: ""; }
  :host .wi-wmo4680-93:before {
    content: ""; }
  :host .wi-wmo4680-94:before {
    content: ""; }
  :host .wi-wmo4680-95:before {
    content: ""; }
  :host .wi-wmo4680-96:before {
    content: ""; }
  :host .wi-wmo4680-99:before {
    content: ""; }
  :host .wi-owm-200:before {
    content: ""; }
  :host .wi-owm-201:before {
    content: ""; }
  :host .wi-owm-202:before {
    content: ""; }
  :host .wi-owm-210:before {
    content: ""; }
  :host .wi-owm-211:before {
    content: ""; }
  :host .wi-owm-212:before {
    content: ""; }
  :host .wi-owm-221:before {
    content: ""; }
  :host .wi-owm-230:before {
    content: ""; }
  :host .wi-owm-231:before {
    content: ""; }
  :host .wi-owm-232:before {
    content: ""; }
  :host .wi-owm-300:before {
    content: ""; }
  :host .wi-owm-301:before {
    content: ""; }
  :host .wi-owm-302:before {
    content: ""; }
  :host .wi-owm-310:before {
    content: ""; }
  :host .wi-owm-311:before {
    content: ""; }
  :host .wi-owm-312:before {
    content: ""; }
  :host .wi-owm-313:before {
    content: ""; }
  :host .wi-owm-314:before {
    content: ""; }
  :host .wi-owm-321:before {
    content: ""; }
  :host .wi-owm-500:before {
    content: ""; }
  :host .wi-owm-501:before {
    content: ""; }
  :host .wi-owm-502:before {
    content: ""; }
  :host .wi-owm-503:before {
    content: ""; }
  :host .wi-owm-504:before {
    content: ""; }
  :host .wi-owm-511:before {
    content: ""; }
  :host .wi-owm-520:before {
    content: ""; }
  :host .wi-owm-521:before {
    content: ""; }
  :host .wi-owm-522:before {
    content: ""; }
  :host .wi-owm-531:before {
    content: ""; }
  :host .wi-owm-600:before {
    content: ""; }
  :host .wi-owm-601:before {
    content: ""; }
  :host .wi-owm-602:before {
    content: ""; }
  :host .wi-owm-611:before {
    content: ""; }
  :host .wi-owm-612:before {
    content: ""; }
  :host .wi-owm-615:before {
    content: ""; }
  :host .wi-owm-616:before {
    content: ""; }
  :host .wi-owm-620:before {
    content: ""; }
  :host .wi-owm-621:before {
    content: ""; }
  :host .wi-owm-622:before {
    content: ""; }
  :host .wi-owm-701:before {
    content: ""; }
  :host .wi-owm-711:before {
    content: ""; }
  :host .wi-owm-721:before {
    content: ""; }
  :host .wi-owm-731:before {
    content: ""; }
  :host .wi-owm-741:before {
    content: ""; }
  :host .wi-owm-761:before {
    content: ""; }
  :host .wi-owm-762:before {
    content: ""; }
  :host .wi-owm-771:before {
    content: ""; }
  :host .wi-owm-781:before {
    content: ""; }
  :host .wi-owm-800:before {
    content: ""; }
  :host .wi-owm-801:before {
    content: ""; }
  :host .wi-owm-802:before {
    content: ""; }
  :host .wi-owm-803:before {
    content: ""; }
  :host .wi-owm-804:before {
    content: ""; }
  :host .wi-owm-900:before {
    content: ""; }
  :host .wi-owm-901:before {
    content: ""; }
  :host .wi-owm-902:before {
    content: ""; }
  :host .wi-owm-903:before {
    content: ""; }
  :host .wi-owm-904:before {
    content: ""; }
  :host .wi-owm-905:before {
    content: ""; }
  :host .wi-owm-906:before {
    content: ""; }
  :host .wi-owm-957:before {
    content: ""; }
  :host .wi-owm-day-200:before {
    content: ""; }
  :host .wi-owm-day-201:before {
    content: ""; }
  :host .wi-owm-day-202:before {
    content: ""; }
  :host .wi-owm-day-210:before {
    content: ""; }
  :host .wi-owm-day-211:before {
    content: ""; }
  :host .wi-owm-day-212:before {
    content: ""; }
  :host .wi-owm-day-221:before {
    content: ""; }
  :host .wi-owm-day-230:before {
    content: ""; }
  :host .wi-owm-day-231:before {
    content: ""; }
  :host .wi-owm-day-232:before {
    content: ""; }
  :host .wi-owm-day-300:before {
    content: ""; }
  :host .wi-owm-day-301:before {
    content: ""; }
  :host .wi-owm-day-302:before {
    content: ""; }
  :host .wi-owm-day-310:before {
    content: ""; }
  :host .wi-owm-day-311:before {
    content: ""; }
  :host .wi-owm-day-312:before {
    content: ""; }
  :host .wi-owm-day-313:before {
    content: ""; }
  :host .wi-owm-day-314:before {
    content: ""; }
  :host .wi-owm-day-321:before {
    content: ""; }
  :host .wi-owm-day-500:before {
    content: ""; }
  :host .wi-owm-day-501:before {
    content: ""; }
  :host .wi-owm-day-502:before {
    content: ""; }
  :host .wi-owm-day-503:before {
    content: ""; }
  :host .wi-owm-day-504:before {
    content: ""; }
  :host .wi-owm-day-511:before {
    content: ""; }
  :host .wi-owm-day-520:before {
    content: ""; }
  :host .wi-owm-day-521:before {
    content: ""; }
  :host .wi-owm-day-522:before {
    content: ""; }
  :host .wi-owm-day-531:before {
    content: ""; }
  :host .wi-owm-day-600:before {
    content: ""; }
  :host .wi-owm-day-601:before {
    content: ""; }
  :host .wi-owm-day-602:before {
    content: ""; }
  :host .wi-owm-day-611:before {
    content: ""; }
  :host .wi-owm-day-612:before {
    content: ""; }
  :host .wi-owm-day-615:before {
    content: ""; }
  :host .wi-owm-day-616:before {
    content: ""; }
  :host .wi-owm-day-620:before {
    content: ""; }
  :host .wi-owm-day-621:before {
    content: ""; }
  :host .wi-owm-day-622:before {
    content: ""; }
  :host .wi-owm-day-701:before {
    content: ""; }
  :host .wi-owm-day-711:before {
    content: ""; }
  :host .wi-owm-day-721:before {
    content: ""; }
  :host .wi-owm-day-731:before {
    content: ""; }
  :host .wi-owm-day-741:before {
    content: ""; }
  :host .wi-owm-day-761:before {
    content: ""; }
  :host .wi-owm-day-762:before {
    content: ""; }
  :host .wi-owm-day-781:before {
    content: ""; }
  :host .wi-owm-day-800:before {
    content: ""; }
  :host .wi-owm-day-801:before {
    content: ""; }
  :host .wi-owm-day-802:before {
    content: ""; }
  :host .wi-owm-day-803:before {
    content: ""; }
  :host .wi-owm-day-804:before {
    content: ""; }
  :host .wi-owm-day-900:before {
    content: ""; }
  :host .wi-owm-day-902:before {
    content: ""; }
  :host .wi-owm-day-903:before {
    content: ""; }
  :host .wi-owm-day-904:before {
    content: ""; }
  :host .wi-owm-day-906:before {
    content: ""; }
  :host .wi-owm-day-957:before {
    content: ""; }
  :host .wi-owm-night-200:before {
    content: ""; }
  :host .wi-owm-night-201:before {
    content: ""; }
  :host .wi-owm-night-202:before {
    content: ""; }
  :host .wi-owm-night-210:before {
    content: ""; }
  :host .wi-owm-night-211:before {
    content: ""; }
  :host .wi-owm-night-212:before {
    content: ""; }
  :host .wi-owm-night-221:before {
    content: ""; }
  :host .wi-owm-night-230:before {
    content: ""; }
  :host .wi-owm-night-231:before {
    content: ""; }
  :host .wi-owm-night-232:before {
    content: ""; }
  :host .wi-owm-night-300:before {
    content: ""; }
  :host .wi-owm-night-301:before {
    content: ""; }
  :host .wi-owm-night-302:before {
    content: ""; }
  :host .wi-owm-night-310:before {
    content: ""; }
  :host .wi-owm-night-311:before {
    content: ""; }
  :host .wi-owm-night-312:before {
    content: ""; }
  :host .wi-owm-night-313:before {
    content: ""; }
  :host .wi-owm-night-314:before {
    content: ""; }
  :host .wi-owm-night-321:before {
    content: ""; }
  :host .wi-owm-night-500:before {
    content: ""; }
  :host .wi-owm-night-501:before {
    content: ""; }
  :host .wi-owm-night-502:before {
    content: ""; }
  :host .wi-owm-night-503:before {
    content: ""; }
  :host .wi-owm-night-504:before {
    content: ""; }
  :host .wi-owm-night-511:before {
    content: ""; }
  :host .wi-owm-night-520:before {
    content: ""; }
  :host .wi-owm-night-521:before {
    content: ""; }
  :host .wi-owm-night-522:before {
    content: ""; }
  :host .wi-owm-night-531:before {
    content: ""; }
  :host .wi-owm-night-600:before {
    content: ""; }
  :host .wi-owm-night-601:before {
    content: ""; }
  :host .wi-owm-night-602:before {
    content: ""; }
  :host .wi-owm-night-611:before {
    content: ""; }
  :host .wi-owm-night-612:before {
    content: ""; }
  :host .wi-owm-night-615:before {
    content: ""; }
  :host .wi-owm-night-616:before {
    content: ""; }
  :host .wi-owm-night-620:before {
    content: ""; }
  :host .wi-owm-night-621:before {
    content: ""; }
  :host .wi-owm-night-622:before {
    content: ""; }
  :host .wi-owm-night-701:before {
    content: ""; }
  :host .wi-owm-night-711:before {
    content: ""; }
  :host .wi-owm-night-721:before {
    content: ""; }
  :host .wi-owm-night-731:before {
    content: ""; }
  :host .wi-owm-night-741:before {
    content: ""; }
  :host .wi-owm-night-761:before {
    content: ""; }
  :host .wi-owm-night-762:before {
    content: ""; }
  :host .wi-owm-night-781:before {
    content: ""; }
  :host .wi-owm-night-800:before {
    content: ""; }
  :host .wi-owm-night-801:before {
    content: ""; }
  :host .wi-owm-night-802:before {
    content: ""; }
  :host .wi-owm-night-803:before {
    content: ""; }
  :host .wi-owm-night-804:before {
    content: ""; }
  :host .wi-owm-night-900:before {
    content: ""; }
  :host .wi-owm-night-902:before {
    content: ""; }
  :host .wi-owm-night-903:before {
    content: ""; }
  :host .wi-owm-night-904:before {
    content: ""; }
  :host .wi-owm-night-906:before {
    content: ""; }
  :host .wi-owm-night-957:before {
    content: ""; }
  :host .wi-wu-chanceflurries:before {
    content: ""; }
  :host .wi-wu-chancerain:before {
    content: ""; }
  :host .wi-wu-chancesleat:before {
    content: ""; }
  :host .wi-wu-chancesnow:before {
    content: ""; }
  :host .wi-wu-chancetstorms:before {
    content: ""; }
  :host .wi-wu-clear:before {
    content: ""; }
  :host .wi-wu-cloudy:before {
    content: ""; }
  :host .wi-wu-flurries:before {
    content: ""; }
  :host .wi-wu-hazy:before {
    content: ""; }
  :host .wi-wu-mostlycloudy:before {
    content: ""; }
  :host .wi-wu-mostlysunny:before {
    content: ""; }
  :host .wi-wu-partlycloudy:before {
    content: ""; }
  :host .wi-wu-partlysunny:before {
    content: ""; }
  :host .wi-wu-rain:before {
    content: ""; }
  :host .wi-wu-sleat:before {
    content: ""; }
  :host .wi-wu-snow:before {
    content: ""; }
  :host .wi-wu-sunny:before {
    content: ""; }
  :host .wi-wu-tstorms:before {
    content: ""; }
  :host .wi-wu-unknown:before {
    content: ""; }
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
