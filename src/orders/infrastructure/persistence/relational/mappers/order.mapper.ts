import { Order } from '../../../../domain/order';

import { OrderItemMapper } from '../../../../../order-items/infrastructure/persistence/relational/mappers/order-item.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { OrderEntity } from '../entities/order.entity';

export class OrderMapper {
  static toDomain(raw: OrderEntity): Order {
    const domainEntity = new Order();
    domainEntity.checkoutSessionId = raw.checkoutSessionId;

    if (raw.items) {
      domainEntity.items = raw.items.map((item) =>
        OrderItemMapper.toDomain(item),
      );
    }

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.totalAmount = raw.totalAmount;

    domainEntity.status = raw.status;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Order): OrderEntity {
    const persistenceEntity = new OrderEntity();
    persistenceEntity.checkoutSessionId = domainEntity.checkoutSessionId;

    if (domainEntity.items) {
      persistenceEntity.items = domainEntity.items.map((item) =>
        OrderItemMapper.toPersistence(item),
      );
    }

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    persistenceEntity.totalAmount = domainEntity.totalAmount;

    persistenceEntity.status = domainEntity.status;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
