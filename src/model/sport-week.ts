/* tslint:disable */
/* eslint-disable */

import { Duration } from "./duration";
import { Training } from "./training";

export interface SportWeek {
  dayOfWeek: string;
  trainings: Array<Training>;
}

export interface SportDay {
  startTime: Date;
  sport: Sport;
  duration: Duration;
}

export enum Sport {
  Swim,
  Ride,
  Run
}