import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
  
  async addDishToRestaurant(restaurantId: number, dishId: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['dishes']
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }
    
    const dish = await this.dishRepository.findOne({
      where: { id: dishId }
    });
    
    if (!dish) {
      throw new NotFoundException(`Dish with ID ${dishId} not found`);
    }
    
    // Check if the dish is already in the restaurant
    const dishExists = restaurant.dishes.some(d => d.id === dishId);
    if (dishExists) {
      throw new BadRequestException(`Dish with ID ${dishId} is already associated with this restaurant`);
    }
    
    restaurant.dishes.push(dish);
    return this.restaurantRepository.save(restaurant);
  }
  
  async findDishesFromRestaurant(restaurantId: number): Promise<Dish[]> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['dishes']
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }
    
    return restaurant.dishes;
  }
  
  async findDishFromRestaurant(restaurantId: number, dishId: number): Promise<Dish> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['dishes']
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }
    
    const dish = restaurant.dishes.find(d => d.id === dishId);
    
    if (!dish) {
      throw new NotFoundException(`Dish with ID ${dishId} not found in restaurant with ID ${restaurantId}`);
    }
    
    return dish;
  }
  
  async updateDishesFromRestaurant(restaurantId: number, dishIds: number[]): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['dishes']
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }
    
    if (!dishIds || dishIds.length === 0) {
      throw new BadRequestException('At least one dish ID must be provided');
    }
    
    const dishes = await this.dishRepository.findByIds(dishIds);
    
    if (dishes.length !== dishIds.length) {
      throw new NotFoundException('One or more dishes not found');
    }
    
    restaurant.dishes = dishes;
    return this.restaurantRepository.save(restaurant);
  }
  
  async deleteDishFromRestaurant(restaurantId: number, dishId: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['dishes']
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }
    
    const dishIndex = restaurant.dishes.findIndex(d => d.id === dishId);
    
    if (dishIndex === -1) {
      throw new NotFoundException(`Dish with ID ${dishId} not found in restaurant with ID ${restaurantId}`);
    }
    
    restaurant.dishes.splice(dishIndex, 1);
    return this.restaurantRepository.save(restaurant);
  }
}
