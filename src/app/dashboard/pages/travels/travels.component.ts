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
  selected: string = '';
  verSelected: string = '';

  capturar() {
    this.verSelected = this.selected;
  }

  constructor() {}

  ngOnInit(): void {}

  onChange() {}

  ngDoCheck(): void {}
}
