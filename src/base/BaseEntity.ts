import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class ClassicEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
