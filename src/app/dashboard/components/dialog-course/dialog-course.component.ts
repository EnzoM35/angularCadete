import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-course',
  templateUrl: './dialog-course.component.html',
  styleUrls: ['./dialog-course.component.scss'],
})
export class DialogCourseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
