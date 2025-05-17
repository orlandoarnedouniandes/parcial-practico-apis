import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { Restaurant } from '../../entities/restaurant.entity';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../dto/restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.restaurantService.remove(id);
  }
}
