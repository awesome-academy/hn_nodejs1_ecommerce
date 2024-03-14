import { MigrationInterface, QueryRunner } from "typeorm";

export class Gration041710244198134 implements MigrationInterface {
    name = 'Gration041710244198134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``);
        await queryRunner.query(`DROP INDEX \`IDX_f091e86a234693a49084b4c2c8\` ON \`cart\``);
        await queryRunner.query(`DROP INDEX \`REL_f091e86a234693a49084b4c2c8\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cart_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_c506b756aa0682057bf66bdb3d\` (\`cart_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c506b756aa0682057bf66bdb3d\` ON \`user\` (\`cart_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c506b756aa0682057bf66bdb3d3\` FOREIGN KEY (\`cart_id\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c506b756aa0682057bf66bdb3d3\``);
        await queryRunner.query(`DROP INDEX \`REL_c506b756aa0682057bf66bdb3d\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_c506b756aa0682057bf66bdb3d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cart_id\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_f091e86a234693a49084b4c2c8\` ON \`cart\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f091e86a234693a49084b4c2c8\` ON \`cart\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_f091e86a234693a49084b4c2c86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
