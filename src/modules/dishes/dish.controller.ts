import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { Dish } from '../../entities/dish.entity';
import { CreateDishDto, UpdateDishDto } from '../../dto/dish.dto';
import { DishService } from './dish.service';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Dish> {
    return this.dishService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createDishDto: CreateDishDto): Promise<Dish> {
    return this.dishService.create(createDishDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateDishDto: UpdateDishDto
  ): Promise<Dish> {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.dishService.remove(id);
  }
}
