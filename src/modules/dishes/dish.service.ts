import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from '../../entities/dish.entity';
import { CreateDishDto, UpdateDishDto } from '../../dto/dish.dto';
import { Restaurant } from '../../entities/restaurant.entity';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll(): Promise<Dish[]> {
    return this.dishRepository.find({ relations: ['restaurants'] });
  }

  async findOne(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({ 
      where: { id },
      relations: ['restaurants']
    });
    
    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
    
    return dish;
  }

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    const { restaurantIds, ...dishData } = createDishDto;
    
   
    const dish = this.dishRepository.create(dishData);
    
    if (restaurantIds && restaurantIds.length > 0) {
      const restaurants = await this.restaurantRepository.findByIds(restaurantIds);
      dish.restaurants = restaurants;
    }
    
    return this.dishRepository.save(dish);
  }

  async update(id: number, updateDishDto: UpdateDishDto): Promise<Dish> {
    const dish = await this.findOne(id);
    const { restaurantIds, ...dishData } = updateDishDto;
    
    Object.assign(dish, dishData);
    
    if (restaurantIds && restaurantIds.length > 0) {
      const restaurants = await this.restaurantRepository.findByIds(restaurantIds);
      dish.restaurants = restaurants;
    }
    
    return this.dishRepository.save(dish);
  }

  async remove(id: number): Promise<void> {
    const result = await this.dishRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }
}
