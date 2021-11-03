export interface PaymentModel {
    paymentDetailId: number;
    cardOwnerName: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
}

export interface LoginModel {
    email: string;
    password: string;
}

export interface RegisterModel {
    username: string;
    email: string;
    password: string;
}

export interface ResponseModel {
    status: boolean;
    message: string;
    data: any
}

export interface DialogConfirmModel {
    id: string;
    message: string;
    result?: boolean;
}