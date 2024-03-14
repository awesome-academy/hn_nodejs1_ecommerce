import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Cart } from './Cart';
import { ClassicEntity } from '../base/BaseEntity';

@Entity('user')
export class User extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ unique: true })
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
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
