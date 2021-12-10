import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Viaje } from '../model/viaje.model';

@Injectable({
  providedIn: 'root',
})
export class serviceTravel {
  public array: Viaje[] = [];

  constructor(private http: HttpClient) {}

  //FK

  ngOnInit() {}

  /* getTravel1(): Observable<Viaje> {
    return this.http.get<Viaje>(`/api/Travel/2/1`);
  }
  getTravel5(): Observable<Viaje> {
    return this.http.get<Viaje>(`/api/Travel/2/5`);
  }

  getTravel10(): Observable<Viaje> {
    return this.http.get<Viaje>(`/api/Travel/2/10`);
  }*/
}
