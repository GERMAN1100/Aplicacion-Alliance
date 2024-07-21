// src/entities/User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  
  @Column({ nullable: true })
  imagenPerfil?: string;


  @Column({ nullable: true })
  nombreUsuario?: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  tel?: string;

  @Column({ nullable: true })
  otroTel?: string;

  @Column({ nullable: true })
  ubicacion?: string;

  @Column({ nullable: true })
  ciudad?: string;

  @Column({ nullable: true })
  documento?: string;

  @Column({ nullable: true })
  present?: string;

  @Column({ nullable: true })
  linkInstagram?: string;

  @Column({ nullable: true })
  linkWeb?: string;

  @Column({ nullable: true })
  linkFacebook?: string;

  @Column({ nullable: true })
  linkCatalogo?: string;

  @Column("simple-array", { nullable: true })
  categorias?: string[];

 
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
