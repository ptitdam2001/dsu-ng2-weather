
export interface MainForecast {
    temp: number;
    temp_min: number;
    temp_max: number;
    temp_kf: number;
    pressure: number;
    sea_level: number;
    humidity: number;
    grnd_level: number;
}

export interface RainForecast {
    _3h: number;
}

export interface SysForecast {
    pod: string;
}

export interface WeatherForecast {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WindForecast {
    speed: number;
    deg: number;
}

export interface CloudsForecast {
    all: number;
}

export interface ForecastItem {
    clouds: CloudsForecast;
    dt: number;
    dt_txt: string;
    main: MainForecast;
    rain: RainForecast;
    sys: SysForecast;
    weather: Array<WeatherForecast>;
    wind: WindForecast;
    date: string;
}

export class Forecast {
    constructor(public date: string, public list: Array<ForecastItem> = []) {}

    public addToList(item: ForecastItem) {
        if (this.list.length === 0 || !this.list.find(predicate => item.dt === predicate.dt)) {
             this.list.push(item);
        }
    }
}
