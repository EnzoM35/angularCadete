import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { asignarViaje } from '../model/asignarViaje.model';

@Injectable({
  providedIn: 'root',
})
export class serviceAssignTrip {
  constructor(private http: HttpClient) {}

  assign(v: asignarViaje): Observable<asignarViaje> {
    return this.http.post<asignarViaje>(
      'api/Travel?travelID=' +
        v.travelID +
        '&statusTravel=' +
        v.statusTravel +
        '&userOperation=' +
        v.userOperation +
        '&cadeteID=' +
        v.cadeteID +
        '&isReasigned=' +
        v.isReasigned,
      v
    );
  }

  ngOnInit() {}
}
