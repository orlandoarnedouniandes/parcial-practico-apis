import { IsString, IsEnum, IsUrl, IsOptional, IsArray } from 'class-validator';
import { KitchenType } from '../entities/restaurant.entity';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEnum(KitchenType)
  kitchenType: KitchenType;

  @IsOptional()
  @IsUrl()
  webSite?: string;

  @IsOptional()
  @IsArray()
  dishIds?: number[];
}

export class UpdateRestaurantDto extends CreateRestaurantDto {}
