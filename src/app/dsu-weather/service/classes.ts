import { URLSearchParams } from '@angular/http';


export class Coordinates {
    lon: number;
    lat: number;
}


export class WeatherSearchParams {
    public city: string = null;
    public country: string = null;
    public zip: string = null;
    public cityId: number = null;
    public coordinates: Coordinates;

    public lang: string = 'en';
    public units: string = 'metric';


    /**
     * Returns a object with parameters
     * 
     * @params string key
     * @return Object
     */
    toUrlSearchParams(key: string): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        params.set('appid', key);
        params.set('lang', this.lang);
        params.set('units', this.units);

        if (this.cityId) {
         params.set('id', this.cityId.toString());
        } else if (this.city) {
            params.set('q', this.country ? this.city + ',' + this.country : this.city);
        } else if (this.coordinates) {
            params.set('lon', this.coordinates.lon.toString());
            params.set('lat', this.coordinates.lat.toString());
        } else if (this.zip) {
            params.set('zip', this.country ? this.zip + ',' + this.country : this.zip);
        }

        return params;
    }

}
