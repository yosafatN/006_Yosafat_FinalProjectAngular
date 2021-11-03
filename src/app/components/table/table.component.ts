import { Component, Output, EventEmitter, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { PaymentModel } from '../models/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  @Output() clickListenerForEdit = new EventEmitter<number>()
  @Output() updateDataListener = new EventEmitter()
  @Output() deleteListener = new EventEmitter<PaymentModel>()

  private eventSubscription: Subscription = new Subscription
  @Input() events: Observable<void> = new Observable

  private loginSubscription: Subscription = new Subscription
  @Input() updateData: Observable<PaymentModel[]> = new Observable<PaymentModel[]>()
  
  dataInit: PaymentModel[] = [
    {
      paymentDetailId: 0,
      cardOwnerName: 'Data Dummy',
      cardNumber: '1234567890654321',
      expirationDate: '11/24',
      securityCode: '1234'
    }
  ]

  dataTable: MatTableDataSource<PaymentModel> = new MatTableDataSource(this.dataInit)

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns: string[] = ['cardOwnerName','cardNumber','expirationDate','actions']
  clickedRows = new Set<PaymentModel>();

  constructor(private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator!
    this.dataTable.sort = this.sort!

    this.eventSubscription = this.events.subscribe(() => {
      this.clickedRows.clear()
    })

    this.loginSubscription = this.updateData.subscribe((res) => {
      this.dataTable = new MatTableDataSource(res)
    })
  }

  callSnackBar(message: string) {
    this.snackBar.open(message, undefined, {duration: 3000})
  }

  clickTable(row: PaymentModel) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
      this.clickListenerForEdit.emit(-1)
    }
    else if (this.clickedRows.size > 0) {
      this.clickedRows.clear()
      this.clickedRows.add(row)
      this.clickListenerForEdit.emit(row.paymentDetailId)
    }
    else {
      this.clickedRows.add(row)
      this.clickListenerForEdit.emit(row.paymentDetailId)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  deletePayment(data: PaymentModel) {
    this.clickedRows.delete(data)
    this.clickListenerForEdit.emit(-1)
    this.deleteListener.emit(data)
  }
}
