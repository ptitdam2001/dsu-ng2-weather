/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CurrentWeatherComponent } from './current-weather.component';

describe('Component: CurrentWeather', () => {

  let component: CurrentWeatherComponent;

  beforeEach(() => {

  });

  it ('should create an instance', () => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent]
    });

    const fixture = TestBed.createComponent(CurrentWeatherComponent);

    // given a component instance with a pony input initialized
    const _component = fixture.componentInstance;

    expect(_component).toBeTruthy();
  });
});
