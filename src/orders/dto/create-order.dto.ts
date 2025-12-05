import { IsArray, ValidateNested } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../../order-items/dto/create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  // Don't forget to use the class-validator decorators in the DTO properties.
}
