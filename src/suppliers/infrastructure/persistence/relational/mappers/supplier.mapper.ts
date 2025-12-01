import { Supplier } from '../../../../domain/supplier';

import { SupplierEntity } from '../entities/supplier.entity';

export class SupplierMapper {
  static toDomain(raw: SupplierEntity): Supplier {
    const domainEntity = new Supplier();
    domainEntity.delivery_date = raw.delivery_date;

    domainEntity.status = raw.status;

    domainEntity.amount = raw.amount;

    domainEntity.company = raw.company;

    domainEntity.address = raw.address;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Supplier): SupplierEntity {
    const persistenceEntity = new SupplierEntity();
    persistenceEntity.delivery_date = domainEntity.delivery_date;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.amount = domainEntity.amount;

    persistenceEntity.company = domainEntity.company;

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
