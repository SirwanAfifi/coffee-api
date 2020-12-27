import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeBrandToCategory1609093023354 implements MigrationInterface {
  name = 'ChangeBrandToCategory1609093023354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "brand" TO "category"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "category" TO "brand"`,
    );
  }
}
