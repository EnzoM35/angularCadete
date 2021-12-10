import { serviceTravel } from '../../services/serviceTravels';
import { Viaje } from '../../model/viaje.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface Viajes {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss'],
})
export class TravelsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  selectedValue: string = '';
  viajesArray: Viaje[] = [];
  dataSource: MatTableDataSource<Viaje>;

  viaje: Viajes[] = [
    { value: 0, viewValue: 'Viajes disponibles/pendientes' },
    { value: 1, viewValue: 'Viajes en curso/aceptados' },
  ];

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ViajesDisponibles();
  }

  //REQUEST VIAJES
  ViajesDisponibles() {
    let status1 = this.http.get<Viaje[]>('/api/Travel/2/1');
    let status5 = this.http.get<Viaje[]>('/api/Travel/2/5');
    let status10 = this.http.get<Viaje[]>('/api/Travel/2/10');

    +forkJoin([status1, status5, status10]).subscribe((results) => {
      this.viajesArray = [...results[0], ...results[1], ...results[2]];

      this.viajesArray.sort(function (a, b) {
        return (
          Date.parse(
            a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
              .operationDate
          ) -
          Date.parse(
            b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
              .operationDate
          )
        );
      });
      this.dataSource = new MatTableDataSource<Viaje>(this.viajesArray);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      console.log(this.dataSource);
      console.log(this.viajesArray);
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
