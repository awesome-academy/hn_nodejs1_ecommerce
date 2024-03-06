import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Cart } from './Cart';
import { ClassicEntity } from '../base/BaseEntity';

@Entity('user')
export class User extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  role: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  image: string;

  // One-to-Many relationship with Order entity
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // One-to-Many relationship with Cart entity
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
