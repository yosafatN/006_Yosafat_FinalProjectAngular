import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { PaymentModel } from '../models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  WARNING_EMPTY: string = 'cannot be empty'
  formValidator: FormGroup

  dataSelected: PaymentModel = {} as PaymentModel
  isEdit: boolean = false

  private formEditSubscription: Subscription = new Subscription
  @Input() formListener: Observable<number> = new Observable
  @Output() editDoneListener = new EventEmitter()
  @Output() submitAddData = new EventEmitter<PaymentModel>()
  @Output() submitEditData = new EventEmitter<PaymentModel>()

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentServiceService) {
    this.formValidator = this.formBuilder.group({
      cardOwnerName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z ]*$/)
      ]],
      cardNumber: ['', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/^[0-9]*$/)
      ]],
      expirationDate: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
      ]],
      securityCode: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern(/^[0-9]*$/)
      ]]
    })
  }

  ngOnInit(): void {
    this.formEditSubscription = this.formListener.subscribe((id) => {
      if (id != -1) {
        this.isEdit = true
        this.dataSelected = this.paymentService.getPaymentById(id)

        this.formValidator.setValue({
          cardOwnerName: this.dataSelected.cardOwnerName,
          cardNumber: this.dataSelected.cardNumber,
          expirationDate: this.dataSelected.expirationDate,
          securityCode: ''
        })

        this.formValidator.controls['securityCode'].disable()
      }
      else {
        this.isEdit = false
        this.formValidator.controls['securityCode'].enable()
        this.formValidator.reset()
      }
    })
  }

  get cardOwnerName () {
    return this.formValidator.get('cardOwnerName')
  }

  get cardNumber () {
    return this.formValidator.get('cardNumber')
  }

  get expirationDate () {
    return this.formValidator.get('expirationDate')
  }

  get securityCode () {
    return this.formValidator.get('securityCode')
  }

  onSubmit(form: FormGroupDirective) {
    if (this.isEdit) {
      const data: PaymentModel = form.value
      data.paymentDetailId = this.dataSelected.paymentDetailId
      data.securityCode = this.dataSelected.securityCode
      this.submitEditData.emit(data)
      this.closeFormEdit()
    }
    else {
      this.submitAddData.emit(form.value)
    }
    form.resetForm()
    this.formValidator.reset()
  }

  closeFormEdit() {
    this.isEdit = false
    this.formValidator.controls['securityCode'].enable()
    this.formValidator.reset()
    this.editDoneListener.emit()
  }  
}
