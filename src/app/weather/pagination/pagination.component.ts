import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { WeatherItem } from '../weather-item';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() weatherItems: Array<any> = [];
  @Output() changePageEvent = new EventEmitter<string>();
  // activePrev: boolean = false;
  // activeNext: boolean = false;
  numberButton: number = 0;
  numArray: Array<number> = [];

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    // this.activePrev = true;
    // if(this.weatherItems.length < 5){
    //   this.activeNext = true;
    // }
    if(!!this.weatherService.getWeatherItems().length){
      let numButton: number = this.weatherService.getWeatherItems().length / 5;
      this.numberButton = numButton%10 === 0 ? numButton : Math.ceil(numButton);
      this.numArray = Array(this.numberButton).fill(1).map((x,i)=>i);
    }
  }

  addNewItem(value: number) {
    console.log(this.numberButton);
    this.numArray = Array(this.numberButton).fill(1).map((x,i)=>i);
    this.changePageEvent.emit(value.toString());
  }

}
