import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cidadeId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nomeCompleto: string;
}
