export interface IDecodedToken{
    email: string;
    id: string;
}

export interface ISignupInput{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILoginInput{
    email: string;
    password: string;
}

export interface IUser{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    invoices: any[];
}

export interface IInvoiceItem{
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export interface IInvoiceInput{
    marchantStreet: string;
    marchantCity: string;
    marchantPostCode: string;
    marchantCountry: string;
    clientName: string;
    clientEmail: string;
    clientStreet: string;
    clientCity: string;
    clientPostCode: string;
    clientCountry: string;
    invoiceDate: Date;
    paymentTerms: string;
    transactionDescription: string;
    itemList: IInvoiceItem[];
}

export interface IInvoice{
    user: string;
    invoiceNumber: string;
    marchantStreet: string;
    marchantCity: string;
    marchantPostCode: string;
    marchantCountry: string;
    clientName: string;
    clientEmail: string;
    clientStreet: string;
    clientCity: string;
    clientPostCode: string;
    clientCountry: string;
    invoiceDate: Date;
    paymentTerms: string;
    transactionDescription: string;
    itemList: IInvoiceItem[];
}