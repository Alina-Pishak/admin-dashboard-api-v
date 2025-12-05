import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderFields1764857373817 implements MigrationInterface {
  name = 'OrderFields1764857373817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "paymentIntentId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "paymentIntentId" character varying NOT NULL`,
    );
  }
}
