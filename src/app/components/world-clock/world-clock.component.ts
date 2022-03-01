import { Component, Inject, OnInit } from '@angular/core';
import { TimeZoneService } from '../../services/time-zone.service';

import { Moment } from 'moment';
import 'moment-timezone';
import * as moment from 'moment';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.css'],
})
export class WorldClockComponent implements OnInit {
  public tzNames: string[];
  public selectedTz: string;

  public displayTz: string;
  public selectedLocale: string;

  public date: moment.Moment;
  public fromNow: string;

  public a: moment.Moment;
  public aFormat: string;
  public aUtcFormat: string;
  public aDateFormat: string;
  public aTimeFormat: string;
  public aSpecialFormat: string;

  private format = 'LLL Z z';
  private dateFormat = 'L';
  public timeFormat = 'LTS';

  public allFormats = [
    'LT (UTC Z)', // 12:32 PM -08:00
    'LTS', // 12:32:18 PM
    'HH:mm:ss.SSS',
    'L', // 10/05/2018
    'LLL', // October 5, 2018 12:32 PM
    'LLLL', // Friday, October 5, 2018 12:32 PM
    'LLLL (UTC Z)',
  ];

  public locales = ['en', 'vi'];


  constructor(
    @Inject('TimeZoneService') private timeZoneService: TimeZoneService
  ) {
    this.tzNames = moment.tz.names();
    this.timeZoneChanged('Asia/Ho_Chi_Minh');
    this.changeLocale('vi');
  }

    /******************
    TIMEZONE FORMAT
  *******************/
  public timeZoneChanged(timeZone: string): void {
    console.log(timeZone);
    this.selectedTz = timeZone;

    this.updateTime(timeZone);
  }

  public changeLocale(locale: string) {
    this.selectedLocale = locale;
    moment.locale(this.selectedLocale);
    this.updateTime(this.selectedTz);
  }

  public formats(format: string): string {
    return this.a.format(format);
  }

  public updateTime(timeZone: string) {
    this.date = moment().utc();
    this.fromNow = this.date.fromNow();

    this.a = moment().tz(timeZone);

    this.aFormat = this.a.format(this.format);
    this.aDateFormat = this.a.format(this.dateFormat);
    this.aTimeFormat = this.a.format(this.timeFormat);
    this.aSpecialFormat = this.applySpecialFormat(this.a);

    this.timeZoneService.setTenantTimeZone(this.selectedTz);

    this.hr = this.a.hour();
    this.min = this.a.minute();
    this.sec = this.a.second();
  }

  public applySpecialFormat(dateTime: moment.Moment): string {
    let special = dateTime.format('llll');
    let offset = dateTime.utcOffset();
    return special + ' ' + dateTime.tz();
  }


    /******************
    ANALOG CLOCK
  *******************/
  d: Moment;
  hr;
  min;
  sec;
  hr_rotation;
  min_rotation;
  sec_rotation;

  ngOnInit() {
    setInterval(() => {
      this.d = moment(); //object of date()
      this.hr_rotation = 30 * this.hr + this.min / 2;
      this.min_rotation = 6 * this.min;
      this.sec_rotation = 6 * this.sec;
      this.sec = this.sec + 1; // move clockwise
      if (this.sec > 60) {
        this.sec = 0;
        this.min = this.min + 1;
      }
      if (this.min > 60) {
        this.min = 0;
        this.hr = this.hr + 1;
      }
      if (this.hr > 24) {
        this.hr = 0;
      }
    }, 1000);
  }
}
