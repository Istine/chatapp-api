import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid") userId;
  @Column({ type: "varchar", unique: true }) email;
  @Column("varchar") password;
  @Column({ type: "json", nullable: true }) tokens = "[]";
}
