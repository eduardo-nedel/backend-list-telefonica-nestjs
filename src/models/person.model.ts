import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column('int')
  age: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 18, nullable: true })
  // +xx xx x xxxx-xxxx
  telefone?: string;
}
