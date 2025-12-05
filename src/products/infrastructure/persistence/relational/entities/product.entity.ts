import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper {
  @ManyToMany(() => SupplierEntity, {
    eager: true,
    nullable: false,
    cascade: true,
  })
  @JoinTable()
  suppliers: SupplierEntity[];

  @Column({
    nullable: false,
    type: String,
  })
  category: string;

  @Column({
    nullable: false,
    type: Number,
  })
  stock: number;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: false,
    type: Number,
  })
  price: number;

  @Column({
    nullable: true,
    type: String,
  })
  photo_url?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
