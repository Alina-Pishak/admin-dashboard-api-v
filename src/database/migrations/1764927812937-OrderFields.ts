import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderFields1764927812937 implements MigrationInterface {
  name = 'OrderFields1764927812937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "checkoutSessionId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'paid', 'shipped', 'completed', 'canceled', 'failed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_status_enum_old" AS ENUM('pending', 'paid', 'shipped', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "checkoutSessionId"`,
    );
  }
}
