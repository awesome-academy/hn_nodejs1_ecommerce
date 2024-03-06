import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";
import { ClassicEntity } from '../base/BaseEntity';
@Entity("cart_item")
export class CartItem extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: "cart_id" })
  cart: Cart;
}
