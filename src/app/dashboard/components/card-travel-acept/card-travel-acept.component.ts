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
  selector: 'app-card-travel-acept',
  templateUrl: './card-travel-acept.component.html',
  styleUrls: ['./card-travel-acept.component.scss'],
})
export class CardTravelAceptComponent implements OnInit {
  viajesAcept: Viaje[];
  //PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Viaje>;
  //SELECT
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viajesAceptados();
  }

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
}
