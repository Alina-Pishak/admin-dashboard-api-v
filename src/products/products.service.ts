import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />
    const suppliersObjects = await this.supplierService.findByIds(
      createProductDto.suppliers.map((entity) => entity.id),
    );
    if (suppliersObjects.length !== createProductDto.suppliers.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          suppliers: 'notExists',
        },
      });
    }
    const suppliers = suppliersObjects;

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      suppliers,

      category: createProductDto.category,

      stock: createProductDto.stock,

      description: createProductDto.description,

      price: createProductDto.price,

      photo_url: createProductDto.photo_url,

      name: createProductDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Product['id']) {
    return this.productRepository.findById(id);
  }

  findByIds(ids: Product['id'][]) {
    return this.productRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],

    updateProductDto: UpdateProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let suppliers: Supplier[] | undefined = undefined;

    if (updateProductDto.suppliers) {
      const suppliersObjects = await this.supplierService.findByIds(
        updateProductDto.suppliers.map((entity) => entity.id),
      );
      if (suppliersObjects.length !== updateProductDto.suppliers.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            suppliers: 'notExists',
          },
        });
      }
      suppliers = suppliersObjects;
    }

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      suppliers,

      category: updateProductDto.category,

      stock: updateProductDto.stock,

      description: updateProductDto.description,

      price: updateProductDto.price,

      photo_url: updateProductDto.photo_url,

      name: updateProductDto.name,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }
}
