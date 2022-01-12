import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ItemGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}