import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AddAvatarColumnInTableUsers1594852687480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar_path',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar_path');
  }
}

export default AddAvatarColumnInTableUsers1594852687480;
