import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1764751945296 implements MigrationInterface {
  name = 'Product1764751945296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("category" character varying NOT NULL, "stock" integer NOT NULL, "description" character varying, "price" integer NOT NULL, "photo_url" character varying, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_suppliers_supplier" ("productId" uuid NOT NULL, "supplierId" uuid NOT NULL, CONSTRAINT "PK_98baff16784cd32a283af711f4c" PRIMARY KEY ("productId", "supplierId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d13f061c3361c028fd062a96a9" ON "product_suppliers_supplier" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa97955af2c87f6e87271eea64" ON "product_suppliers_supplier" ("supplierId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product_suppliers_supplier" ADD CONSTRAINT "FK_d13f061c3361c028fd062a96a98" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_suppliers_supplier" ADD CONSTRAINT "FK_aa97955af2c87f6e87271eea64b" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_suppliers_supplier" DROP CONSTRAINT "FK_aa97955af2c87f6e87271eea64b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_suppliers_supplier" DROP CONSTRAINT "FK_d13f061c3361c028fd062a96a98"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa97955af2c87f6e87271eea64"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d13f061c3361c028fd062a96a9"`,
    );
    await queryRunner.query(`DROP TABLE "product_suppliers_supplier"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
