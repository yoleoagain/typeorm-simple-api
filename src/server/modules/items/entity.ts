import { 
  Column, Entity, PrimaryGeneratedColumn, 
  OneToOne, CreateDateColumn, UpdateDateColumn,
  OneToMany,
  // JoinColumn
} from 'typeorm'
import { ItemGroup } from '../groups/entity'
import { Prices } from '../prices/entity'
import { ItemPictures } from '../item_pictures/entity'

@Entity()
export class Item {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Prices, price => price.item)
  prices: Prices[];

  @OneToMany(() => ItemPictures, picture => picture.item)
  // @JoinColumn()
  pictures: ItemPictures[];

  @OneToOne(() => ItemGroup, item => item.id)
  item_group_id: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}