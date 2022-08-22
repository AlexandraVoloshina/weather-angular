import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-weather';
  updateListInChild:Subject<any> = new Subject();

  changeList($event: any){
    this.updateListInChild.next(undefined);
  }
}
