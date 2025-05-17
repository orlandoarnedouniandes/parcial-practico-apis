import { IsString, IsNumber, IsEnum, IsOptional, IsArray, Min } from 'class-validator';
import { DishCategory } from '../entities/dish.entity';

export class DishDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(DishCategory)
  category: DishCategory;

  @IsOptional()
  @IsArray()
  restaurantIds?: number[];
}

export class CreateDishDto extends DishDto {}
export class UpdateDishDto extends DishDto {}
