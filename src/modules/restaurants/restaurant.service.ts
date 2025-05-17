import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../../entities/restaurant.entity';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../dto/restaurant.dto';
import { Dish } from '../../entities/dish.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({ relations: ['dishes'] });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ 
      where: { id },
      relations: ['dishes']
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    
    return restaurant;
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const { dishIds, ...restaurantData } = createRestaurantDto;
    
    const restaurant = this.restaurantRepository.create(restaurantData);
    
    if (dishIds && dishIds.length > 0) {
      const dishes = await this.dishRepository.findByIds(dishIds);
      restaurant.dishes = dishes;
    }
    
    return this.restaurantRepository.save(restaurant);
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    const { dishIds, ...restaurantData } = updateRestaurantDto;
    
    Object.assign(restaurant, restaurantData);
    
    if (dishIds && dishIds.length > 0) {
      const dishes = await this.dishRepository.findByIds(dishIds);
      restaurant.dishes = dishes;
    }
    
    return this.restaurantRepository.save(restaurant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }
}
