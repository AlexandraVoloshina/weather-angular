import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherItem } from '../weather-item';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {

  weatherArray: Array<WeatherItem> = [];
  page:number = 0;
  @Input()
  updateList:Subject<any> = new Subject();
  pageForDelete: boolean = false;
  // subscription: any;
  // browserRefresh: any;

  constructor(public weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherArray = this.weatherService.weatherItems;
    this.changePage(0);
    this.updateList.subscribe(event => {
      this.changePage(undefined);
    });
  }


  changePage($event: any){
    console.log('$event', $event);
    if($event !== undefined)
      this.page = !this.pageForDelete ? +$event + 1 : +$event;
    if(this.page === 1){
      this.weatherArray = this.weatherService.getWeatherItems().slice(0, 5);
    } else {
      this.weatherArray = this.weatherService.getWeatherItems().slice(this.page*5 - 5, this.page*5);
    }
  }

  deleteItem($event: any){
    let id = $event.id;
    this.pageForDelete = true;
    this.weatherArray = this.weatherService.deleteWeatherItem(id);
    this.changePage(this.page);
  }

  ngOnDestroy() {
    this.updateList.unsubscribe();
  }
}
