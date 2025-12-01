import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier',
})
export class SupplierEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Date,
  })
  delivery_date: Date;

  @Column({
    nullable: false,
    type: String,
  })
  status: string;

  @Column({
    nullable: false,
    type: Number,
  })
  amount: number;

  @Column({
    nullable: false,
    type: String,
  })
  company: string;

  @Column({
    nullable: false,
    type: String,
  })
  address: string;

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
