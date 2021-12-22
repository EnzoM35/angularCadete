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
  selector: 'app-card-travel',
  templateUrl: './card-travel.component.html',
  styleUrls: ['./card-travel.component.scss'],
})
export class CardTravelComponent implements OnInit {
  viajesArray: Viaje[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Viaje>;
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private assignService: serviceAssignTrip,
    public dialog: MatDialog
  ) {}

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
    });
  }

  asignarViaje(item: Viaje) {
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

    this.assignService.assign(asignar).subscribe(
      (resp) => {
        this.openDialog('Viaje asignado!');
        this.viajesDisponibles();
      },
      (error) => {
        console.clear();
        this.openDialog(
          'Ya no puedes asignarte mas viajes(Máximo 4), completa los que tienes en curso!'
        );
      }
    );
  }

  ngOnInit(): void {
    this.viajesDisponibles();
  }

  //Diálogo para confirmar
  openDialog(mensaje: string) {
    this.dialog.open(DialogComponent, {
      data: mensaje,
      width: '350px',
    });
  }

  estadoMap: any = {
    '1': 'Solicitud de retiro en domicilio',
    '5': 'Solicitud de retiro en laboratorio',
    other: '-',
  };
}
