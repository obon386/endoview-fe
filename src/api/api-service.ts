import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { YearWeek } from "src/model/year-week";
import { RequestBuilder } from "./request-builder";
import { StrictHttpResponse } from "./strict-http-response";

@Injectable({
    providedIn: 'root',
  })
export class ApiService {
  constructor(
      private http: HttpClient
  ) { }
    
  getWeeks(params: {
    year: number
  }): Observable<StrictHttpResponse<Array<YearWeek>>> {

    const rb = new RequestBuilder('http://localhost:8080', '/weeks/' + params.year, 'get');
    if (params) {

    }

    console.log(JSON.stringify(rb.build({
        responseType: 'json',
        accept: 'application/json'
      })));

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<YearWeek>>;
      })
    );
  }    
}
