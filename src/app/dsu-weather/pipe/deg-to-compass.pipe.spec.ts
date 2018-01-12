/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DegToCompassPipe } from './deg-to-compass.pipe';

describe('Pipe: DegToCompass', () => {
  it('create an instance', () => {
    let pipe = new DegToCompassPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns a string to get a compass', () => {
    let pipe = new DegToCompassPipe();

    expect(pipe.transform(0)).toBe('N');
    expect(pipe.transform(180)).toBe('S');
    expect(pipe.transform(720)).toBe('N');
    expect(pipe.transform(11)).toBe('N');
    expect(pipe.transform(12)).toBe('NNE');
    expect(pipe.transform(33)).toBe('NNE');
    expect(pipe.transform(34)).toBe('NE');
  });
});
