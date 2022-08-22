import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class WeatherService  implements OnInit{

  API_KEY: string = '016cb0776e20164d8192c5abf9f9e1ca';
  weatherItems: Array<any> = [];

  constructor(public _http: HttpClient) {
    this.weatherItems = JSON.parse(localStorage.getItem('weather') || '[]');
  }

  ngOnInit() {
  }

  getRevGeoLocation(lat: number, lng: number): any {
    if (navigator.geolocation) {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);
        let request = {
            latLng: latlng
        };
        return Observable.create((observer: any)=> {
            geocoder.geocode(request, (results: any, status: any) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0]);
                    observer.next(results[0])
                    observer.complete();
                } else {
                    console.log('Error: ', results, ' & Status: ', status);
                    observer.error();
                }
            });
        });
    }
  }

  getLocalCity(lat: string, lon: string): Observable<any>{
    return this._http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`);
  }

  searchWeatherData(city: string): Observable<any>{
    return this._http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric`);
  }

  addWeatherItems(item: any){
    console.log(item);
    this.weatherItems.unshift(item);
    localStorage.setItem('weather', JSON.stringify(this.weatherItems));
  }

  getWeatherItems = () => this.weatherItems;

  deleteWeatherItem = (id: number): any => this.weatherItems = this.weatherItems.filter(item => item.id !== id);

}
