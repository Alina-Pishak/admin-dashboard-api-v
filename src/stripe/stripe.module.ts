import { DynamicModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from '../orders/orders.module';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [ConfigModule.forRoot(), forwardRef(() => OrdersModule)],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: (configService: ConfigService) =>
            configService.get<string>('STRIPE_API_KEY', { infer: true }),
          inject: [ConfigService],
        },
        {
          provide: 'STRIPE_WEBHOOK',
          useFactory: (configService: ConfigService) =>
            configService.get<string>('STRIPE_WEBHOOK', { infer: true }),
          inject: [ConfigService],
        },
      ],
      controllers: [StripeController],
      exports: [StripeService],
    };
  }
}
