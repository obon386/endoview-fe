import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/api/api-service';
import { YearWeek } from 'src/model/year-week';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  years:number[];
  months:string[];

  selectedYear = 2022;
  selectedMonth = '';
  currentMonth: number;

  @Output()
  monthSelected = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) {
    this.years = [2022, 2021, 2020];
    // this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.months = ['Dec','Nov','Oct','Sep','Aug','Jul','Jun','May','Apr','Mar','Feb','Jan'];

    let date: Date = new Date();
    this.selectedYear = date.getFullYear();
    this.currentMonth = date.getMonth();

   }

  ngOnInit(): void {
  }

  getMonths(year: number) : string[] {
    // console.log("getMonths " + year);

    if (this.selectedYear === year) {
      return this.months.slice(this.months.length - this.currentMonth - 1);
    } else {
      return this.months;
    }
  }

  selectMonth(year: number, month: string) {
    console.log("selectMonth " + year + ", " + month);
    this.selectedYear = year;
    this.selectedMonth = month;

    this.monthSelected.emit({'year': year, 'month': month});
  }

  yearClass(year: number) {
    // console.log("yearClass " + year);
    return year == this.selectedYear ? "textSelected" : "";
  }

  isMonthSelected(year: number, month: string) {
    // console.log("isMonthSelected " + this.currentMonth);
    return year == this.selectedYear && month === this.selectedMonth;
  }
}
