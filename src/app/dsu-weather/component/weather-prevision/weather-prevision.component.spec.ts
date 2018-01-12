/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { WeatherPrevisionComponent } from './weather-prevision.component';

describe('Component: WeatherPrecision', () => {

  it ('should create an instance', () => {
    TestBed.configureTestingModule({
      declarations: [WeatherPrevisionComponent]
    });

    const fixture = TestBed.createComponent(WeatherPrevisionComponent);

    // given a component instance with a pony input initialized
    const _component = fixture.componentInstance;

    expect(_component).toBeTruthy();
  });
});
