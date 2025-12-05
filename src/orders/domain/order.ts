import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '../../order-items/domain/order-item';
import { User } from '../../users/domain/user';
import { OrderStatus } from '../enums/order-status.enum';

export class Order {
  @ApiProperty({
    type: () => [OrderItem],
    nullable: false,
  })
  items?: OrderItem[];

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalAmount?: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  checkoutSessionId?: string;

  @ApiProperty({
    enum: OrderStatus,
    nullable: false,
  })
  status: OrderStatus;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
