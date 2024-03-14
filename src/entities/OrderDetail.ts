import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { ClassicEntity } from '../base/BaseEntity';

@Entity('order_detail')
export class OrderDetail extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'double' })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn()
  product: Product;
}
