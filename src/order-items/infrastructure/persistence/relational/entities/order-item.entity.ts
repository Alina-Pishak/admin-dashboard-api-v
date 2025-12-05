import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { OrderEntity } from '../../../../../orders/infrastructure/persistence/relational/entities/order.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order_item',
})
export class OrderItemEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  quantity: number;

  @Column({
    nullable: false,
    type: Number,
  })
  priceAtPurchase: number;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: false })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order?: OrderEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
