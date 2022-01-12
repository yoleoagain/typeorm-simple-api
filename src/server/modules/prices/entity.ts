import { 
  JoinColumn,
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { PriceType, Item } from '../entities'

@Entity()
export class Prices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 7, scale: 2 })
  price: number = 0;

  @OneToOne(() => PriceType, priceType => priceType.id)
  @JoinColumn()
  price_type_id: number;

  @ManyToOne(() => Item, item => item.prices)
  item: Item;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}