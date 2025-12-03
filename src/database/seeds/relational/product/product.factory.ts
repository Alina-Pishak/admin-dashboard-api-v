import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';
import { SupplierFactory } from '../supplier/supplier.factory';

@Injectable()
export class ProductFactory {
  constructor(
    @InjectRepository(ProductEntity)
    private repositoryProduct: Repository<ProductEntity>,
    private supplierFactory: SupplierFactory,
  ) {}

  createRandomProduct() {
    return () => {
      const suppliers = [
        this.supplierFactory.createRandomSupplier()(),
        this.supplierFactory.createRandomSupplier()(),
      ];
      console.log('suppliers', suppliers);
      return this.repositoryProduct.create({
        suppliers,
        category: faker.commerce.department(),
        stock: faker.number.int({ min: 0, max: 500 }),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 100, max: 5000 }),
        photo_url: faker.image.url(),
        name: faker.commerce.productName(),
      });
    };
  }
}
