import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { OrderItemsModule } from '../order-items/order-items.module';
import { StripeModule } from '../stripe/stripe.module';
import { UsersModule } from '../users/users.module';
import { RelationalOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    forwardRef(() => OrderItemsModule),

    UsersModule,
    // do not remove this comment
    RelationalOrderPersistenceModule,
    forwardRef(() => StripeModule.forRootAsync()),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrderPersistenceModule],
})
export class OrdersModule {}
