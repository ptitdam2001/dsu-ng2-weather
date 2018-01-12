/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { WeatherArroundComponent } from './weather-arround.component';

describe('Component: WeatherArround', () => {

  it ('should create an instance', () => {
    TestBed.configureTestingModule({
      declarations: [WeatherArroundComponent]
    });

    const fixture = TestBed.createComponent(WeatherArroundComponent);

    // given a component instance with a pony input initialized
    const _component = fixture.componentInstance;

    expect(_component).toBeTruthy();
  });
});
