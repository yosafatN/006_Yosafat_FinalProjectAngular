import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmModel } from '../models/user';

@Component({
  selector: 'app-dialog-conferm',
  templateUrl: './dialog-conferm.component.html',
  styleUrls: ['./dialog-conferm.component.css']
})
export class DialogConfermComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfermComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogConfirmModel) { }

  ngOnInit(): void {
  }

  yes() {
    const result = this.data
    result.result = true
    this.dialogRef.close(result)
  }

  no() {
    const result = this.data
    result.result = false
    this.dialogRef.close(result)
  }

}
