import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { SupplierFactory } from './supplier.factory';
import { faker } from '@faker-js/faker';

@Injectable()
export class SupplierSeedService {
  constructor(
    @InjectRepository(SupplierEntity)
    private repository: Repository<SupplierEntity>,
    private supplierFactory: SupplierFactory,
  ) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(this.supplierFactory.createRandomSupplier(), {
        count: 10,
      }),
    );
  }
}
