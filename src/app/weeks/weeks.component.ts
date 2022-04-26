import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/api/api-service';
import { Duration } from 'src/model/duration';
import { Sport, Training } from 'src/model/training';
import { YearWeek } from 'src/model/year-week';
import {LoadingService} from '../service/loading/loading.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeksComponent implements OnInit, OnChanges {

  @Input() currentYear = 0;
  @Input() currentMonth = '';

  weekDays:string[];
  yearWeeks:YearWeek[];
  currentWeekIndex = 0;
  
  previousOffset = 0;
  currentOffset = 0;

  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  isLoading$: Observable<boolean>;

  // listener;

  // @HostListener('scroll') onScroll(e: Event): void {
  //   console.log(JSON.stringify(e));
  //   console.log(this.getYPosition(e));
  // }

  constructor(
    // private renderer2: Renderer2,
    private api: ApiService,
    private loadingService: LoadingService,
   ) {
		// fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
		// 	.subscribe((e: Event) => console.log(JSON.stringify(e)));

      // this.listener = this.renderer2.listen('window', 'scroll', (e) => {
    //   console.log(JSON.stringify(e));
    //   console.log(this.getYPosition(e));
    // });     

    this.isLoading$ = this.loadingService.isLoading$;
    this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.yearWeeks = [];
    console.log("constructor ");
    // this.fetchRelevantWeeks();

  }

  
	ngOnDestroy(): void {
    this.destroy.next(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    var chy = changes['currentYear'];
    var chm = changes['currentMonth'];
    console.log("ngOnChanges " + JSON.stringify(chy) + ", " + JSON.stringify(chm));

    // if ( chy && !chy.firstChange || chm && !chm.firstChange) {
      this.fetchRelevantWeeks();
    // }
  }

  ngOnInit(): void {
    // console.log("ngOnInit: " + this.currentYear + " m: " + this.currentMonth);
    // this.fetchRelevantWeeks();
  }

  getWeeks(): YearWeek[] {
    return this.yearWeeks;
  } 

  private fetchRelevantWeeks() {
    this.api.getWeeks({ year: this.currentYear }).subscribe((response) => {
      console.log(JSON.stringify(response));
      let swl = response.body;
      // console.log(JSON.stringify(swl));
      swl.forEach(w => {
        this.yearWeeks.push(w);
      });
      this.yearWeeks = response.body;

      this.currentWeekIndex = 0;
      console.log("latest Week: " + JSON.stringify(this.yearWeeks[this.currentWeekIndex]));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  getTrainings(day: string): Array<Training> {
    let res = new Array<Training>();
    res.push(new Training(new Date(), Sport.Ride, new Duration(75, "1:15")));
    // console.log("getTrainings for " + day);
    return res;
  }

  getDataTimestamp(week:YearWeek): string {
    return "" + week.year + week.monthOfDayLast + week.dayLast;
  }

  getDivAttributes(week: YearWeek): any {
    return { 
      'data-timestamp': this.getDataTimestamp(week)
    }
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  @HostListener('window:scroll', ['$event'])  
  onWindowScroll(event: Event) {
    // console.log("onWindowScroll:" + JSON.stringify(event));
    // console.log("onWindowScroll:" + JSON.stringify(event.target));
    // console.log("getYPosition: " + this.getYPosition(event));
    // console.log("verticalOffset: " + window.pageYOffset);
    // console.log("verticalOffset: " + document.documentElement.scrollTop);
    // console.log("verticalOffset: " + document.body.scrollTop);

    this.previousOffset = this.currentOffset;
    this.currentOffset = window.pageYOffset 
           || document.documentElement.scrollTop 
           || document.body.scrollTop || 0;

    var scrollingDown = (this.currentOffset > this.previousOffset);
          
    var isCurrentWeekInViewport = this.isWeekInViewport(this.getCurrentWeek(this.currentWeekIndex));

    console.log("this.currentWeekIndex: " + this.currentWeekIndex);

    if (scrollingDown && !isCurrentWeekInViewport) {
      this.currentWeekIndex++;
    }
  }

  getCurrentWeek(index: number): YearWeek {
    return this.yearWeeks[index];
  }

  isWeekInViewport(week:YearWeek): boolean {
    let dataTimestamp = week.year + week.monthOfDayLast + week.dayLast;
    const element = document.querySelector(`[data-timestamp=\"${dataTimestamp}\"]`);
    console.log(element);
    console.log(this.isInViewport(element));
    return this.isInViewport(element);
  } 

  isInViewport(element: any): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
