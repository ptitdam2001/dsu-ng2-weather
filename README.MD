An angular2 module consisting of a service and components developed from the openweathermap API.

Installation
------------

To install this library, run:

```bash
$ npm install dsu-ng2-weather --save
```

Consuming the library
---------------------

You can import your library in any Angular application by running:

```bash
$ npm install dsu-ng2-weather
```

and then you must configure your application :

### if you are using [Angular CLI](https://github.com/angular/angular-cli)

1.	add `../node_modules/weather-icons/css/weather-icons.css` and `../node_modules/weather-icons/css/weather-icons-winds.css` to **style** block of *angular-cli.json*.

2.	add `../node_modules/weather-icons/fonts/*.+(otf|eot|svg|ttf|woff|woff2)` to **addons** block of *angular-cli.json*.

```json
/* angular-cli.json  */
{
  "apps": [
    {
      "styles": [
        "../node_modules/weather-icons/css/weather-icons.css"
        "../node_modules/weather-icons/css/weather-icons-wind.css"
      ]
    }
  ],
  "addons": [
    "../node_modules/weather-icons/fonts/*.+(otf|eot|svg|ttf|woff|woff2)"
  ]
}
```

To finish, you have to add below code in your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { WeatherModule } from 'dsu-ng2-weather';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    WeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives, services and pipes in your Angular application:

### The component ngw-current-weather

it is a card where it is displayed the current weather of given city or coordinates.

#### Parameters

-	[city] : it is a string describing an address
-	[coordinates] : it is an object like { lon: number, lat: number}, [optionnal]
-	[refreshMin] : it is the time in minute of data refresh (by default it is 1 minute) [optionnal]
-	[lang] : init the translation of text (by default it is 'en') [optionnal]

#### Examples

```html
<!-- You can now use your library component in app.component.html -->
<ngw-current-weather [city]="'paris, france'"></ngw-current-weather>

<!-- to refresh each one minute -->
<ngw-current-weather [city]="'paris, france'" [refreshMin]="1"></ngw-current-weather>

<ngw-current-weather [coordinates]="{lng: 4, lat: 0}"></ngw-current-weather>
```

Development
-----------

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

TODO
----

[ * ] Manage the output language

[ ] Update documentation with usage examples

License
-------

MIT © [Damien Suhard](ptitdam2001@gmail.com) 2016
