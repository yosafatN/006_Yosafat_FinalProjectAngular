import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogConfermComponent } from './components/dialog-conferm/dialog-conferm.component';
import { LoginComponent } from './components/login/login.component';
import { DialogConfirmModel, PaymentModel } from './components/models/user';
import { LoadingComponent } from './loading/loading.component';
import { PaymentServiceService } from './services/payment-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PaymentApp';

  eventForm: Subject<number> = new Subject<number>()
  editDone: Subject<void> = new Subject<void>()
  goUpdateData: Subject<PaymentModel[]> = new Subject<PaymentModel[]>()

  dialogRefLoading: any

  constructor(public dialog: MatDialog, private paymentService: PaymentServiceService, private snackBar: MatSnackBar) {
    this.openLoginDialog()
  }

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.id = "login"
    dialogConfig.disableClose = true
    let dialogRef =this.dialog.open(LoginComponent, dialogConfig)
    
    dialogRef.afterClosed().subscribe(() => {
      this.openLoading()
      this.updateData()
    })
  }

  openLoading() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    this.dialogRefLoading = this.dialog.open(LoadingComponent, dialogConfig)
  }

  setFormForEdit(id: number) {
    this.eventForm.next(id)
  }

  setEditDone() {
    this.editDone.next()
  }

  updateData() {
    this.paymentService.getAllPayment().subscribe(res => {
      this.goUpdateData.next(res.data)
      this.dialogRefLoading.close()
    },
    err => {
      this.dialogRefLoading.close()
      this.reOpenDialogLogin()
    })
  }

  submitAddData(data: PaymentModel) {
    let message = `Do you want to add ${data.cardOwnerName}'s data?`
    let dataDialog: DialogConfirmModel = {
      id: 'add',
      message: message 
    } 

    const dialogConfig = new MatDialogConfig()
    dialogConfig.id = "login"
    dialogConfig.disableClose = true
    dialogConfig.data = dataDialog
    let dialogAddRef = this.dialog.open(DialogConfermComponent, dialogConfig)
    
    dialogAddRef.afterClosed().subscribe((res: DialogConfirmModel) => {
      if (res.result) {
        this.openLoading()
        this.paymentService.addPayment(data).subscribe((res) => {
          this.callSnackbar(res.message)
          this.updateData()
        },
        err => {
          this.reOpenDialogLogin()
        })
      }
    })
  }

  submitEditData(data: PaymentModel) {
    let message = `Are you sure about ${data.cardOwnerName}'s data changes?`
    let dataDialog: DialogConfirmModel = {
      id: 'edit',
      message: message 
    } 

    const dialogConfig = new MatDialogConfig()
    dialogConfig.id = "login"
    dialogConfig.disableClose = true
    dialogConfig.data = dataDialog
    let dialogAddRef = this.dialog.open(DialogConfermComponent, dialogConfig)
    
    dialogAddRef.afterClosed().subscribe((res: DialogConfirmModel) => {
      if (res.result) {
        this.openLoading()
        this.paymentService.editPayment(data).subscribe((res) => {
          this.callSnackbar(res.message)
          this.updateData()
        },
        err => {
          this.reOpenDialogLogin()
        })
      }
    })
  }

  submitDeleteData(data: PaymentModel) {
    this.setEditDone()
    let message = `Are you sure to delete ${data.cardOwnerName}'s data?`
    let dataDialog: DialogConfirmModel = {
      id: 'edit',
      message: message 
    } 

    const dialogConfig = new MatDialogConfig()
    dialogConfig.id = "login"
    dialogConfig.disableClose = true
    dialogConfig.data = dataDialog
    let dialogAddRef = this.dialog.open(DialogConfermComponent, dialogConfig)
    
    dialogAddRef.afterClosed().subscribe((res: DialogConfirmModel) => {
      if (res.result) {
        this.openLoading()
        this.paymentService.deletePayment(data.paymentDetailId).subscribe((res) => {
          this.callSnackbar(res.message)
          this.updateData()
        },
        err => {
          this.reOpenDialogLogin()
        })
      }
    })
  }

  callSnackbar(message: string) {
    this.snackBar.open(message, undefined, {duration: 3000})
  }

  reOpenDialogLogin() {
    this.dialogRefLoading.close()
    this.callSnackbar('There is something wrong. This is not your fault. Sorry you have to re-login')
    this.openLoginDialog()
  }
}
