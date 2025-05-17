import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

export enum DishCategory {
  STARTER = 'starter',
  MAIN_COURSE = 'main course',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
}

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'varchar',
    enum: DishCategory,
    default: DishCategory.MAIN_COURSE,
  })
  category: DishCategory;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.dishes)
  restaurants: Restaurant[];
}
