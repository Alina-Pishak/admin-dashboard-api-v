import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderFields1764933161323 implements MigrationInterface {
  name = 'OrderFields1764933161323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "checkoutSessionId" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "checkoutSessionId" SET NOT NULL`,
    );
  }
}
