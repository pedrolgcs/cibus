'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

// fabrica de users
Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    active: data.active
  }
})

Factory.blueprint('App/Models/Restaurant', async (faker) => {
  return {
    name: faker.name(),
    opening_time: '08:00',
    closing_time: '15:00',
    delivery: faker.bool(),
    delivery_price: faker.integer({ min: 1, max: 3 }),
    payment_card: faker.bool(),
    city: faker.city(),
    neighborhood: faker.street(),
    street: faker.street(),
    number: faker.areacode()
  }
})

Factory.blueprint('App/Models/Phone', async (faker) => {
  return {
    phone: faker.phone(),
    message: faker.bool()
  }
})

Factory.blueprint('roles', async (faker, i, data) => {
  return {
    slug: data.slug,
    name: data.name,
    description: data.description
  }
})
