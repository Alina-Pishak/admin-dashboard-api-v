import { IsNumber, IsString } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  productId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
