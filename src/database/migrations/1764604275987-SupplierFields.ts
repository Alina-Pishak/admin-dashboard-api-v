import { MigrationInterface, QueryRunner } from 'typeorm';

export class SupplierFields1764604275987 implements MigrationInterface {
  name = 'SupplierFields1764604275987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "delivery_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "company" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "address" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "company"`);
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "supplier" DROP COLUMN "delivery_date"`,
    );
  }
}
