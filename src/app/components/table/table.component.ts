import { Component, Output, EventEmitter, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { PaymentModel } from '../models/user';

const dataInit: PaymentModel[] = []

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

  dataTable: MatTableDataSource<PaymentModel>

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['cardOwnerName','cardNumber','expirationDate','actions']
  clickedRows = new Set<PaymentModel>();

  constructor(private snackBar: MatSnackBar) {
    this.dataTable = new MatTableDataSource(dataInit)
  }

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator
    this.dataTable.sort = this.sort

    this.eventSubscription = this.events.subscribe(() => {
      this.clickedRows.clear()
    })

    this.loginSubscription = this.updateData.subscribe((res) => {
      this.dataTable.data = res
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
    this.deleteListener.emit(data)
  }
}
