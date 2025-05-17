# Restaurant Management System API

A RESTful API for managing restaurants and dishes built with Nest.js and TypeORM.

## Features

- CRUD operations for restaurants
- CRUD operations for dishes
- Many-to-many relationship between restaurants and dishes
- Data validation using class-validator
- SQLite database for easy setup

## Project Structure

```
src/
├── dto/                 # Data Transfer Objects
├── entities/            # Database entities
├── modules/
│   ├── dishes/          # Dish module, controller, service
│   └── restaurants/     # Restaurant module, controller, service
├── app.module.ts        # Main application module
├── main.ts              # Application entry point
```

## Entity Relationships

- **Restaurant**: Has fields for name, address, kitchen type, and website
- **Dish**: Has fields for name, description, price, and category
- A restaurant can have multiple dishes, and a dish can be available in multiple restaurants (many-to-many relationship)

## API Endpoints

### Restaurants

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get a specific restaurant
- `POST /api/restaurants` - Create a new restaurant
- `PUT /api/restaurants/:id` - Update a restaurant
- `DELETE /api/restaurants/:id` - Delete a restaurant

### Dishes

- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/:id` - Get a specific dish
- `POST /api/dishes` - Create a new dish
- `PUT /api/dishes/:id` - Update a dish
- `DELETE /api/dishes/:id` - Delete a dish

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/restaurant-management-api.git

# Navigate to the project directory
cd restaurant-management-api

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

## Usage Examples

### Creating a Restaurant

```json
POST /api/restaurants

{
  "name": "Pasta Paradise",
  "address": "123 Main St, Cityville",
  "kitchenType": "Italian",
  "webSite": "https://pastaparadise.com",
  "dishIds": [1, 2]
}
```

### Creating a Dish

```json
POST /api/dishes

{
  "name": "Spaghetti Carbonara",
  "description": "Classic Italian pasta with eggs, cheese, pancetta, and pepper",
  "price": 12.99,
  "category": "main course",
  "restaurantIds": [1]
}
```
MISW4403 – Diseño y Construcción de APIs Parcial Práctico
