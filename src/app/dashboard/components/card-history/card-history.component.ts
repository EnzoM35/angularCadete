import { Viaje } from '../../model/viaje.model';
import { asignarViaje } from '../../model/asignarViaje.model';
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
import { serviceAssignTrip } from '../../services/serviceAssignTrip';
import { DialogComponent } from 'src/app/auth/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-history',
  templateUrl: './card-history.component.html',
  styleUrls: ['./card-history.component.scss'],
})
export class CardHistoryComponent implements OnInit {
  viajesArray: Viaje[];
  //PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Viaje>;
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private assignService: serviceAssignTrip,
    public dialog: MatDialog
  ) {}

  estadoMap: any = {
    '4': 'Entregado al laboratorio',
    '8': 'Entregado (Esperando confirmación)',
    other: '-',
  };

  //REQUEST VIAJES DISPONIBLES
  viajesRealizados() {
    let idCadete = JSON.parse(localStorage.getItem('id')!);
    let status4 = this.http.get<Viaje[]>('/api/Travel/2/4');
    let status8 = this.http.get<Viaje[]>('/api/Travel/2/8');

    +forkJoin([status4, status8]).subscribe((results) => {
      this.viajesArray = [...results[0], ...results[1]];

      this.viajesArray = this.viajesArray.filter((item) => {
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
    });
  }

  ngOnInit(): void {
    this.viajesRealizados();
  }

  //Diálogo para confirmar
  openDialog(mensaje: string) {
    this.dialog.open(DialogComponent, {
      data: mensaje,
      width: '350px',
    });
  }
}
