'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/sessions', 'SessionController.create')

Route.resource('/users', 'UserController').apiOnly()

Route.resource('/restaurants', 'RestaurantController').apiOnly().middleware(new Map([
  [['store', 'show', 'update', 'destroy'], ['auth']]
]))

Route.resource('restaurants/:id/phones', 'PhoneController').apiOnly().except(['show']).middleware(['auth'])
