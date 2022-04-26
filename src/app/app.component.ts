import { Component, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from 'src/api/api-service';
import { YearWeek } from 'src/model/year-week';
import { Sport, Training } from 'src/model/training';
import { Duration } from 'src/model/duration';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  title = 'endoview-fe';

  currentYear = 2022;
  currentMonth = 'Dec';

  weekDays:string[];
  yearWeeks:YearWeek[];

  // listener;

  // @HostListener('window:scroll') onScroll(e: Event): void {
  //   console.log(JSON.stringify(e));
  //   console.log(this.getYPosition(e));
  // }

  constructor(
    private renderer2: Renderer2,
    private api: ApiService
   ) {
    // this.listener = this.renderer2.listen('window', 'scroll', (e) => {
    //   console.log(JSON.stringify(e));
    //   console.log(this.getYPosition(e));
    // });     
    this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.yearWeeks = [];
  }

  onMonthSelected(selection: any) {
    console.log("onMonthSelected " + selection.year + ", " + selection.month);

    this.currentYear = selection.year;
    this.currentMonth = selection.month;
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    // this.listener();
  }

}
