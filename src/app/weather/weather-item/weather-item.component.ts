import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherItem } from '../weather-item';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() weatherItem: WeatherItem;
  @Output() deleteItemEvent = new EventEmitter<any>();

  constructor(public weatherService: WeatherService) {
    this.weatherItem = new WeatherItem(0, "", "", 0);
  }


  ngOnInit(): void {

  }

  deleteItem(weatherItemId: WeatherItem){
    this.deleteItemEvent.emit(weatherItemId);
  }

}
