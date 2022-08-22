import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../weather-item';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-local',
  templateUrl: './weather-local.component.html',
  styleUrls: ['./weather-local.component.scss']
})
export class WeatherLocalComponent implements OnInit {

  message: string = '';
  city: WeatherItem;


  constructor(public weatherService: WeatherService) {
    this.city = new WeatherItem(Date.now(), '', '', 0);
  }

  ngOnInit(): void {
    this.geoFindMe();
  }

  geoFindMe = (): void => {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
  }
    success = (position: any) => {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;

      this.weatherService.getLocalCity(latitude, longitude).subscribe(data => {
        this.city = new WeatherItem(Date.now(), data.name, data.weather[0].description, data.main.temp);
      });
    }
    error = () => {
      this.message = "Unable to retrieve your location";
    }

}
