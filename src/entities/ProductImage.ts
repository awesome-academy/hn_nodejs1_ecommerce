import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { ClassicEntity } from '../base/BaseEntity';

@Entity("product_image")
export class ProductImage extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn()
  product: Product;
}
