import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { CartItem } from './CartItem';
import { OrderDetail } from './OrderDetail';
import { ProductImage } from './ProductImage';
import { ClassicEntity } from '../base/BaseEntity';

@Entity('product')
export class Product extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'double' })
  price: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  disable: number;

  @Column({ nullable: true })
  unit: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  // One-to-Many relationship with CartItem entity
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  // One-to-Many relationship with OrderDetail entity
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];
}
