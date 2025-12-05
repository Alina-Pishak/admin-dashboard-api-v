import { OrderItemsService } from '../order-items/order-items.service';

import { UsersService } from '../users/users.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { StripeService } from '../stripe/stripe.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { OrderRepository } from './infrastructure/persistence/order.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => OrderItemsService))
    private readonly orderItemService: OrderItemsService,

    private readonly userService: UsersService,
    // Dependencies here
    private readonly orderRepository: OrderRepository,
    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
  ) {}

  async create(userJwtPayload: JwtPayloadType, createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />

    const userObject = await this.userService.findById(userJwtPayload.id);
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    const items = await Promise.all(
      createOrderDto.items.map(async (item) => {
        return await this.orderItemService.create(item);
      }),
    );

    const totalAmount = items.reduce(
      (sum, i) => sum + i.priceAtPurchase * i.quantity,
      0,
    );

    const checkoutSession =
      await this.stripeService.createCheckoutSession(items);

    const order = await this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      items,
      user,
      totalAmount,
      status: OrderStatus.PENDING,
      checkoutSessionId: checkoutSession.id,
    });

    return {
      orderId: order.id,
      checkout_session_url: checkoutSession.url,
      totalAmount,
    };
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  findByCheckoutSessionId(id: string) {
    return this.orderRepository.findByCheckoutSessionId(id);
  }

  async updateOrderStatus({
    checkoutSessionId,
    status,
  }: {
    checkoutSessionId: string;
    status: OrderStatus;
  }): Promise<Order | null> {
    const order = await this.findByCheckoutSessionId(checkoutSessionId);

    order.status = status;

    return this.orderRepository.update(order.id, order);
  }

  // async update(
  //   id: Order['id'],

  //   updateOrderDto: UpdateOrderDto,
  // ) {
  //   // Do not remove comment below.
  //   // <updating-property />

  //   let items: OrderItem[] | undefined = undefined;

  //   if (updateOrderDto.items) {
  //     const itemsObjects = await this.orderItemService.findByIds(
  //       updateOrderDto.items.map((entity) => entity.id),
  //     );
  //     if (itemsObjects.length !== updateOrderDto.items.length) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           items: 'notExists',
  //         },
  //       });
  //     }
  //     items = itemsObjects;
  //   }

  //   let user: User | undefined = undefined;

  //   if (updateOrderDto.user) {
  //     const userObject = await this.userService.findById(
  //       updateOrderDto.user.id,
  //     );
  //     if (!userObject) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           user: 'notExists',
  //         },
  //       });
  //     }
  //     user = userObject;
  //   }

  //   return this.orderRepository.update(id, {
  //     // Do not remove comment below.
  //     // <updating-property-payload />
  // checkoutSessionId: updateOrderDto.checkoutSessionId,

  //     items,

  //     user,

  //     paymentIntentId: updateOrderDto.paymentIntentId,

  //     totalAmount: updateOrderDto.totalAmount,

  //     status: updateOrderDto.status,
  //   });
  // }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
