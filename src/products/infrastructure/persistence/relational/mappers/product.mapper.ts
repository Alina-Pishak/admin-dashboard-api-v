import { Product } from '../../../../domain/product';
import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    if (raw.suppliers) {
      domainEntity.suppliers = raw.suppliers.map((item) =>
        SupplierMapper.toDomain(item),
      );
    }

    domainEntity.category = raw.category;

    domainEntity.stock = raw.stock;

    domainEntity.description = raw.description;

    domainEntity.price = raw.price;

    domainEntity.photo_url = raw.photo_url;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    if (domainEntity.suppliers) {
      persistenceEntity.suppliers = domainEntity.suppliers.map((item) =>
        SupplierMapper.toPersistence(item),
      );
    }

    persistenceEntity.category = domainEntity.category;

    persistenceEntity.stock = domainEntity.stock;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.price = domainEntity.price;

    persistenceEntity.photo_url = domainEntity.photo_url;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
