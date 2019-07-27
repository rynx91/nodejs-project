export class OrderDetailsModel {
  public order_id: number;
  public amount: number;
  public status: string;
  public created_date: Date;
  public payment_status: string;
  public declined_reason: string;
}
