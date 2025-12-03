import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

@Injectable()
export class SupplierFactory {
  constructor(
    @InjectRepository(SupplierEntity)
    private repositorySupplier: Repository<SupplierEntity>,
  ) {}

  createRandomSupplier() {
    return () =>
      this.repositorySupplier.create({
        delivery_date: faker.date.soon(),
        status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered']),
        amount: faker.number.int({ min: 100, max: 5000 }),
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        name: faker.person.fullName(),
      });
  }
}
