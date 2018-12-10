import { Job } from './models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  /* Hosted backend */
  readonly ROOT_URL = 'https://checklist-testing.azurewebsites.net/api/values';
  /* Local backend */
  // readonly ROOT_URL = 'http://localhost:9001/api/values';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    const url = `${this.ROOT_URL}`;
    return this.http.get<Job[]>(url, this.httpOptions)
      .pipe(
        catchError((e: any) => Observable.throw(this.handleError(e)))
      );
  }

  getJob(jobName: string): Observable<Job> {
    const url = `${this.ROOT_URL}/${jobName}`;
    return this.http.get<Job>(url, this.httpOptions)
      .pipe(
        catchError((e: any) => Observable.throw(this.handleError(e)))
      );
  }

  createJob(job: Job): Observable<Job> {
    const url = `${this.ROOT_URL}`;
    return this.http.post<Job>(url, job, this.httpOptions)
      .pipe(
        catchError((e: any) => Observable.throw(this.handleError(e)))
      );
  }

  updateJob (job: Job): Observable<Job> {
    const url = `${this.ROOT_URL}/${job.name}`;
    return this.http.put<Job>(url, job, this.httpOptions)
      .pipe(
        catchError((e: any) => Observable.throw(this.handleError(e)))
      );
  }

  deleteJob(jobName: string): Observable<{}> {
    const url = `${this.ROOT_URL}/${jobName}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError((e: any) => Observable.throw(this.handleError(e)))
      );
  }

  handleError(err: any) {
    console.log(err);
  }
}
