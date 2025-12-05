import { Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';

@ApiTags('Webhook')
@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  async handleWebhook(@Request() request: Request) {
    const sig = request.headers['stripe-signature'];
    await this.stripeService.handleWebhook(sig, request.body);
  }
}
