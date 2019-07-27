export class OrderModel {
  public order_id: number;
  public amount: number;
  public user_id: number;
  public status: string;
  public created_date: Date;
  public last_update: Date;
  public pin: number;
  public update_frequency: number;
}
