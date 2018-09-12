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

// rota para realizar o login
Route.post('/sessions', 'SessionController.create')

// rota de usuários
Route.resource('/users', 'UserController').apiOnly()

// rota de permissões
Route.resource('/permissions', 'PermissionController').apiOnly()
  .middleware('auth:jwt')

// rota de roles
Route.resource('/roles', 'RoleController').apiOnly()
  .middleware('auth:jwt')

// rota de restaurantes
Route.resource('/restaurants', 'RestaurantController').apiOnly()
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth:jwt', 'is:(administrator or moderator)']]
  ]))

// rota de telefones dos restaurantes
Route.resource('/restaurants/:id/phones', 'PhoneController').apiOnly()
  .except(['show'])
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth:jwt']]
  ]))

// rota de restaurantes favoritos
Route.resource('/user/favorites', 'FavoriteController').apiOnly()
  .middleware('auth:jwt')
