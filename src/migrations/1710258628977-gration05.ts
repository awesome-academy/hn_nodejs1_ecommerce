import { MigrationInterface, QueryRunner } from "typeorm";

export class Gration051710258628977 implements MigrationInterface {
    name = 'Gration051710258628977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_f091e86a234693a49084b4c2c86\``);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`user_id\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD UNIQUE INDEX \`IDX_756f53ab9466eb52a52619ee01\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`DROP INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP INDEX \`IDX_756f53ab9466eb52a52619ee01\``);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`userId\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_f091e86a234693a49084b4c2c86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
