import { Migration } from '@mikro-orm/migrations';

export class Migration20201230125702 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `roles` varchar(100) not null default 'PUBLIC', `status` tinyint not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `profile_picture` varchar(32) not null, `address_line_1` varchar(100) null, `address_line_2` varchar(100) null, `town` varchar(16) not null, `state` varchar(16) not null, `city` varchar(16) not null, `postcode` varchar(16) not null, `aadhar` varchar(16) null, `pan` varchar(16) null, `gstin` varchar(16) null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }
}
