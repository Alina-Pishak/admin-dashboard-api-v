import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    type: () => [SupplierDto],
  })
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsArray()
  suppliers: SupplierDto[];

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  category: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  photo_url?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
