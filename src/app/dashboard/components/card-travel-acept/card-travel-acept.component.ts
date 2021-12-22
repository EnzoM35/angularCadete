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
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { serviceChange } from '../../services/serviceChange';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/auth/components/dialog/dialog.component';
import { DialogCourseComponent } from '../dialog-course/dialog-course.component';

@Component({
  selector: 'app-card-travel-acept',
  templateUrl: './card-travel-acept.component.html',
  styleUrls: ['./card-travel-acept.component.scss'],
})
export class CardTravelAceptComponent implements OnInit {
  viajesAcept: Viaje[];
  zero: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Viaje>;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private servicechange: serviceChange,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viajesAceptados();
  }

  //GET VIAJES ACEPTADOS
  viajesAceptados() {
    let idCadete = JSON.parse(localStorage.getItem('id')!);
    let status2 = this.http.get<Viaje[]>('/api/Travel/2/2');
    let status3 = this.http.get<Viaje[]>('/api/Travel/2/3');
    let status6 = this.http.get<Viaje[]>('/api/Travel/2/6');
    let status7 = this.http.get<Viaje[]>('/api/Travel/2/7');

    +forkJoin([status2, status3, status6, status7]).subscribe((results) => {
      this.viajesAcept = [
        ...results[0],
        ...results[1],
        ...results[2],
        ...results[3],
      ];

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

      if (this.viajesAcept.length === 0) {
        this.zero = true;
      }
      this.dataSource = new MatTableDataSource<Viaje>(this.viajesAcept);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  //BOTON RETIRAR VIAJE
  retiredTrip(item: Viaje) {
    if (item.lastStatusTravel === 2 || item.lastStatusTravel === 6) {
      let status: number = item.lastStatusTravel + 1;
      let userO: number = JSON.parse(localStorage.getItem('rolID')!);
      let idCadete: number = JSON.parse(localStorage.getItem('id')!);

      let asignar: asignarViaje = {
        travelID: item.id,
        statusTravel: status,
        userOperation: userO,
        cadeteID: idCadete,
        isReasigned: false,
      };

      this.servicechange.changeStatus(asignar).subscribe((resp) => {
        this.openDialog('Viaje retirado!');
        this.viajesAceptados();
      });
    } else {
      this.openDialog(
        'Este viaje no puede ser retirado, su estado no es de entrega asignada!'
      );
    }
  }

  //BOTON FINALIZAR VIAJE
  finished(item: Viaje) {
    if (item.lastStatusTravel === 3 || item.lastStatusTravel === 7) {
      let status: number = item.lastStatusTravel + 1;
      let userO: number = JSON.parse(localStorage.getItem('rolID')!);
      let idCadete: number = JSON.parse(localStorage.getItem('id')!);

      let asignar: asignarViaje = {
        travelID: item.id,
        statusTravel: status,
        userOperation: userO,
        cadeteID: idCadete,
        isReasigned: false,
      };

      this.servicechange.changeStatus(asignar).subscribe((resp) => {
        this.openDialog('Viaje entregado!');
        this.viajesAceptados();
      });
    }
  }

  //BOTON RENUNCIAR VIAJE
  renounced(item: Viaje) {
    if (item.lastStatusTravel === 2 || item.lastStatusTravel === 6) {
      let status: number = item.lastStatusTravel - 1;

      let userO: number = JSON.parse(localStorage.getItem('rolID')!);
      let idCadete: number = JSON.parse(localStorage.getItem('id')!);

      let asignar: asignarViaje = {
        travelID: item.id,
        statusTravel: status,
        userOperation: userO,
        cadeteID: idCadete,
        isReasigned: true,
      };

      this.servicechange.changeStatus(asignar).subscribe((resp) => {
        this.openDialog('Viaje Renunciado!');
        this.viajesAceptados();
      });
    }
  }

  //Diálogo para confirmar
  openDialog(mensaje: string) {
    this.dialog.open(DialogComponent, {
      data: mensaje,
      width: '350px',
    });
  }

  //Mostrar envío en detalle
  show(item: Viaje): void {
    this.dialog.open(DialogCourseComponent, {
      data: item,
      width: '400px',
    });
    this.dialog.afterAllClosed.subscribe((resp) => {
      this.ngOnInit();
    });
  }

  //Mostrar y ocultar botones

  showFinished(st: number): boolean {
    if (st === 3 || st === 7) {
      return true;
    } else {
      return false;
    }
  }

  showRR(st: number): boolean {
    if (st === 2 || st === 6) {
      return true;
    } else {
      return false;
    }
  }

  estadoMap: any = {
    '2': 'Aceptaste el viaje',
    '3': 'Tenés el envío en tu poder',
    '6': 'Aceptaste este viaje',
    '7': 'Tenés el envío en tu poder',
    other: '-',
  };
}
