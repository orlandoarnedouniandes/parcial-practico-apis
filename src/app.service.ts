import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Dish } from './entities/dish.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async clearDatabase(): Promise<{ message: string }> {
    // Clear the join table first (restaurant_dishes)
    await this.restaurantRepository
      .createQueryBuilder()
      .relation(Restaurant, 'dishes')
      .of({})
      .remove({});
    
    // Delete all restaurants
    await this.restaurantRepository.clear();
    
    // Delete all dishes
    await this.dishRepository.clear();
    
    // Reset auto-increment counters in SQLite
    // For restaurants table
    await this.restaurantRepository.query('DELETE FROM sqlite_sequence WHERE name = "restaurant"');
    
    // For dishes table
    await this.dishRepository.query('DELETE FROM sqlite_sequence WHERE name = "dish"');
    
    // For the join table
    await this.restaurantRepository.query('DELETE FROM sqlite_sequence WHERE name = "restaurant_dishes"');
    
    return { message: 'Database cleared successfully and IDs reset' };
  }
}
