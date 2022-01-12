import { 
  Column, Entity, PrimaryGeneratedColumn, 
  ManyToOne, CreateDateColumn, UpdateDateColumn,
  // JoinColumn
  // OneToMany
} from 'typeorm'
import { Item } from '../items/entity'

@Entity()
export class ItemPictures {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  picture_url: string;

  @ManyToOne(() => Item, item => item.pictures)
  // @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  item: Item;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}