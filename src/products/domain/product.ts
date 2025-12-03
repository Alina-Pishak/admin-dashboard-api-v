import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    type: () => [Supplier],
    nullable: false,
  })
  suppliers: Supplier[];

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  category: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  photo_url?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
