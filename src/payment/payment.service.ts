// // payment/payment.service.ts
// import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe';

// @Injectable()
// export class PaymentService {
//   async handleSuccessfulPayment(sessionId:string) {
//     console.log(`Payment successful for intent: ${paymentIntent.id}`);
//     this.logger.log(`Checkout session completed: ${session.id}`);
//        await this.ordersService.updateOrderStatus({
//       checkoutSessionId: session.id,
//       status: OrderStatus.PAID,
//     });
//   }
//   async handleCanceledPayment(paymentIntent: Stripe.PaymentIntent) {
//     console.log(`Payment successful for intent: ${paymentIntent.id}`);
//     // Implement your business logic here (e.g., update order status, send email)
//   }
//   async handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
//     console.log(`Payment successful for intent: ${paymentIntent.id}`);
//     // Implement your business logic here (e.g., update order status, send email)
//   }
// }
