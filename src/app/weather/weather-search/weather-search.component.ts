import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { WeatherItem } from '../weather-item';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  cityForm: FormGroup;
  @Output() changeListEvent = new EventEmitter<any>();

  constructor(public weatherService: WeatherService) {
    this.cityForm = new FormGroup({
      location: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.cityForm.value);
    let {location} = this.cityForm.value;
    this.weatherService.searchWeatherData(location)
      .subscribe(
        data => {
          console.log(data);
          this.weatherService.addWeatherItems(new WeatherItem(Date.now(), data.name, data.weather[0].description, data.main.temp));
          this.changeListEvent.emit();
        },
        (error: any) => alert(error.error.message)
      )

  }

}
