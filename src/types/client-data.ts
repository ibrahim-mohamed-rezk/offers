// Client data types for PDF generation

export interface Installment {
  رقم_القسط: number;
  الصافي_بعد_الخصم: number;
}

export interface Unit {
  رقم_الوحدة: number;
  الكود?: string;
  النموذج: string;
  الاقساط: Installment[];
  اجمالي_الوحدة?: number;
}

export interface Client {
  اسم_العميل: string;
  الوحدات: Unit[];
}

export interface ClientData {
  عدد_العملاء: number;
  العملاء: Client[];
}

export type UnitType = 'residential' | 'commercial' | 'administrative';

export interface ClientSelection {
  clientName: string;
  unitType: UnitType;
  unitIndex?: number;
}
