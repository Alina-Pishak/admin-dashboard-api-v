import { Body, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { OrderItem } from '../order-items/domain/order-item';
import { OrderStatus } from '../orders/enums/order-status.enum';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    @Inject('STRIPE_API_KEY')
    private readonly apiKey: string,
    @Inject('STRIPE_WEBHOOK')
    private readonly webhookSecret: string,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-11-17.clover', // Use latest API version, or "null" for your default
    });
  }

  // Checkout Session
  async createCheckoutSession(
    items: OrderItem[],
    currency: string = 'usd',
  ): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: items.map((item) => ({
          price_data: {
            currency,
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.priceAtPurchase,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `http://example.com/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'ttp://example.com/cancel',
      });

      this.logger.log('Checkout session created successfully');
      return session;
    } catch (error) {
      this.logger.error('Failed to create checkout session', error.stack);
      throw error;
    }
  }

  async handleWebhook(sig: string, @Body() body) {
    this.logger.log(`Received Stripe webhook. Signature: ${sig}`);

    if (!sig) {
      this.logger.warn('Missing stripe-signature header');
      return;
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        sig,
        this.webhookSecret,
      );
      this.logger.log(`Webhook verified. Type: ${event.type}`);
    } catch (err) {
      this.logger.error(
        `Webhook signature verification failed: ${err.message}`,
      );
      return;
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        this.logger.log(`Checkout session completed: ${session.id}`);

        await this.ordersService.updateOrderStatus({
          checkoutSessionId: session.id,
          status: OrderStatus.PAID,
        });
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        this.logger.warn(`Checkout session payment failed: ${session.id}`);

        await this.ordersService.updateOrderStatus({
          checkoutSessionId: session.id,
          status: OrderStatus.FAILED,
        });
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        this.logger.warn(`Checkout session expired: ${session.id}`);

        await this.ordersService.updateOrderStatus({
          checkoutSessionId: session.id,
          status: OrderStatus.CANCELED,
        });
        break;
      }

      default:
        this.logger.debug(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }
}
