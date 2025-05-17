import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Restaurant } from './entities/restaurant.entity';
import { Dish } from './entities/dish.entity';
import { RestaurantModule } from './modules/restaurants/restaurant.module';
import { DishModule } from './modules/dishes/dish.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'restaurant.sqlite',
      entities: [Restaurant, Dish],
      synchronize: true, // Only use in development
    }),
    RestaurantModule,
    DishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
