import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { ClassicEntity } from '../base/BaseEntity';

@Entity('category')
export class Category extends ClassicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // One-to-Many relationship with Product entity
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
