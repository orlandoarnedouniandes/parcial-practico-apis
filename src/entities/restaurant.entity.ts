import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Dish } from './dish.entity';

export enum KitchenType {
  ITALIAN = 'Italian',
  JAPANESE = 'Japanese',
  MEXICAN = 'Mexican',
  COLOMBIAN = 'Colombian',
  INDIAN = 'Indian',
  INTERNATIONAL = 'International',
}

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    type: 'varchar',
    enum: KitchenType,
    default: KitchenType.INTERNATIONAL,
  })
  kitchenType: KitchenType;

  @Column({ nullable: true })
  webSite: string;

  @ManyToMany(() => Dish, (dish) => dish.restaurants)
  @JoinTable({
    name: 'restaurant_dishes',
    joinColumn: {
      name: 'restaurant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'dish_id',
      referencedColumnName: 'id',
    },
  })
  dishes: Dish[];
}
