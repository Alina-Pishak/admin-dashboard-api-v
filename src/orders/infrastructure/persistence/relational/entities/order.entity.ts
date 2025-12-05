import { OrderItemEntity } from '../../../../../order-items/infrastructure/persistence/relational/entities/order-item.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { OrderStatus } from '../../../../enums/order-status.enum';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  checkoutSessionId?: string | null;

  @OneToMany(() => OrderItemEntity, (childEntity) => childEntity.order, {
    eager: true,
    nullable: false,
    cascade: true,
  })
  items?: OrderItemEntity[];

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  user: UserEntity;

  @Column({
    nullable: false,
    type: Number,
  })
  totalAmount?: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
