import { Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { serviceChange } from '../../services/serviceChange';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/auth/components/dialog/dialog.component';
import { CardTravelAceptComponent } from '../card-travel-acept/card-travel-acept.component';

@Component({
  selector: 'app-dialog-course',
  templateUrl: './dialog-course.component.html',
  styleUrls: ['./dialog-course.component.scss'],
})
export class DialogCourseComponent implements OnInit {
  arrayShow: string[] = [];
  viajesAcept: Viaje[];
  //PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Viaje>;
  constructor(
    public dialogRef: MatDialogRef<DialogCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Viaje,
    private servicechange: serviceChange,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Mostrar y ocultar botones

  showFinished(st: string): boolean {
    if (st === 'Estado del viaje: Tenés el envío en tu poder') {
      return true;
    } else {
      return false;
    }
  }

  showRR(st: string): boolean {
    if (st === 'Estado del viaje: Aceptaste el viaje') {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.convert();
  }

  //BOTON RETIRAR VIAJE
  retiredTrip() {
    if (this.data.lastStatusTravel === 2 || this.data.lastStatusTravel === 6) {
      let status: number = this.data.lastStatusTravel + 1;
      let userO: number = JSON.parse(localStorage.getItem('rolID')!);
      let idCadete: number = JSON.parse(localStorage.getItem('id')!);

      let asignar: asignarViaje = {
        travelID: this.data.id,
        statusTravel: status,
        userOperation: userO,
        cadeteID: idCadete,
        isReasigned: false,
      };

      this.servicechange.changeStatus(asignar).subscribe((resp) => {
        this.openDialog('Viaje retirado!');
        this.onNoClick();
      });
    } else {
      this.openDialog(
        'Este viaje no puede ser retirado, su estado no es de entrega asignada!'
      );
    }
  }

  //BOTON FINALIZAR VIAJE
  finished() {
    if (this.data.lastStatusTravel === 3 || this.data.lastStatusTravel === 7) {
      let status: number = this.data.lastStatusTravel + 1;
      let userO: number = JSON.parse(localStorage.getItem('rolID')!);
      let idCadete: number = JSON.parse(localStorage.getItem('id')!);

      let asignar: asignarViaje = {
        travelID: this.data.id,
        statusTravel: status,
        userOperation: userO,
        cadeteID: idCadete,
        isReasigned: false,
      };

      this.servicechange.changeStatus(asignar).subscribe((resp) => {
        this.openDialog('Viaje entregado!');
        this.onNoClick();
      });
    }
  }

  //BOTON RENUNCIAR VIAJE
  renounced() {
    if (this.data.lastStatusTravel === 2 || this.data.lastStatusTravel === 6) {
      let status: number = this.data.lastStatusTravel - 1;

      let userO: number = JSON.parse(localStorage.getItem('rolID')!);
      let idCadete: number = JSON.parse(localStorage.getItem('id')!);

      let asignar: asignarViaje = {
        travelID: this.data.id,
        statusTravel: status,
        userOperation: userO,
        cadeteID: idCadete,
        isReasigned: true,
      };

      this.servicechange.changeStatus(asignar).subscribe((resp) => {
        this.openDialog('Viaje Renunciado!');
        this.onNoClick();
      });
    }
  }
  openDialog(mensaje: string) {
    this.dialog.open(DialogComponent, {
      data: mensaje,
      width: '350px',
    });
  }

  convert(): void {
    let adress: string =
      'Dirección: ' +
      this.data.travelEquipmentDTOs[this.data.travelEquipmentDTOs.length - 1]
        .equipment.cliente.address;
    let fecha: Date = new Date(
      this.data.travelEquipmentDTOs[
        this.data.travelEquipmentDTOs.length - 1
      ].operationDate
    );
    let date: string = 'Fecha: ' + fecha.toLocaleString();

    let equipment: string =
      'Equipo: ' +
      this.data.travelEquipmentDTOs[this.data.travelEquipmentDTOs.length - 1]
        .equipment.mark +
      ' ' +
      this.data.travelEquipmentDTOs[this.data.travelEquipmentDTOs.length - 1]
        .equipment.model;
    let estado: string;
    if (this.data.lastStatusTravel === 2 || this.data.lastStatusTravel === 6) {
      estado = 'Estado del viaje: Aceptaste el viaje';
    } else {
      estado = 'Estado del viaje: Tenés el envío en tu poder';
    }

    this.arrayShow.push(adress);
    this.arrayShow.push(date);
    this.arrayShow.push(equipment);
    this.arrayShow.push(estado);
  }
}
