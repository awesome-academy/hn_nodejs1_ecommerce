import { MigrationInterface, QueryRunner } from "typeorm";

export class Gration031710238901401 implements MigrationInterface {
    name = 'Gration031710238901401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD UNIQUE INDEX \`IDX_f091e86a234693a49084b4c2c8\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_f091e86a234693a49084b4c2c8\` ON \`cart\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_f091e86a234693a49084b4c2c86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``);
        await queryRunner.query(`DROP INDEX \`REL_f091e86a234693a49084b4c2c8\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP INDEX \`IDX_f091e86a234693a49084b4c2c8\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_f091e86a234693a49084b4c2c86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
