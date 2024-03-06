import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { OrderDetail } from './OrderDetail';
import { ClassicEntity } from '../base/BaseEntity';

@Entity('order')
export class Order extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  totalAmount: number;

  @Column()
  status: number;

  @Column({ nullable: true })
  typeOrder: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // One-to-Many relationship with OrderDetail entity
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
