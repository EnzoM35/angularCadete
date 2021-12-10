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

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss'],
})
export class TravelsComponent implements OnInit {
  isVisible: boolean;
  isVisible2: boolean;
  viajesAcept: Viaje[];
  viajesArray: Viaje[];
  //PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Viaje>;
  //SELECT
  selected: string;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viajesDisponibles();

    this.changeDetectorRef.detectChanges();
    this.selected = 'Viajes disponibles';
  }

  //REQUEST VIAJES DISPONIBLES
  viajesDisponibles() {
    let status1 = this.http.get<Viaje[]>('/api/Travel/2/1');
    let status5 = this.http.get<Viaje[]>('/api/Travel/2/5');

    +forkJoin([status1, status5]).subscribe((results) => {
      this.viajesArray = [...results[0], ...results[1]];

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

  //REQUEST VIAJES ACEPTADOS
  viajesAceptados() {
    let idCadete = JSON.parse(localStorage.getItem('id')!);
    let status2 = this.http.get<Viaje[]>('/api/Travel/2/2');
    let status3 = this.http.get<Viaje[]>('/api/Travel/2/3');
    let status6 = this.http.get<Viaje[]>('/api/Travel/2/6');

    +forkJoin([status2, status3, status6]).subscribe((results) => {
      this.viajesAcept = [...results[0], ...results[1], ...results[2]];

      this.viajesAcept = this.viajesAcept.filter((item) => {
        if (
          item.travelEquipmentDTOs[item.travelEquipmentDTOs.length - 1].cadete
        ) {
          return (
            item.travelEquipmentDTOs[item.travelEquipmentDTOs.length - 1].cadete
              .id === idCadete
          );
        }
        return false;
      });

      this.viajesAcept.sort(function (a, b) {
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

      this.dataSource = new MatTableDataSource<Viaje>(this.viajesAcept);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      console.log(this.viajesAcept);
    });
  }

  onChange() {
    this.viajesDisponibles();
  }

  viewAcept(): void {
    this.viajesAceptados();
  }

  ngDoCheck(): void {}

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
