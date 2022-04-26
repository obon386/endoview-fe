/* tslint:disable */
/* eslint-disable */

import { Duration } from "./duration";

export class Training {
  constructor(private startTime: Date, private sport: Sport, private duration: Duration) {
  }
}

export enum Sport {
  Swim,
  Ride,
  Run
}