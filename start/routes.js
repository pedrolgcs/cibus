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
  .except(['index', 'destroy'])
  .middleware(new Map([
    [['show', 'update'], ['auth:jwt']]
  ]))

// rota de administrador para users
Route.resource('/admin/users', 'AdminUserController').apiOnly()
  .middleware(['auth:jwt', 'is:(administrator)'])

// rota de permissões
Route.resource('/permissions', 'PermissionController').apiOnly()
  .middleware(['auth:jwt', 'is:(administrator)'])

// rota de roles
Route.resource('/roles', 'RoleController').apiOnly()
  .middleware(['auth:jwt', 'is:(administrator)'])

// rota de restaurantes
Route.resource('/restaurants', 'RestaurantController').apiOnly()
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth:jwt', 'is:(client)']]
  ]))

// rota de telefones dos restaurantes
Route.resource('/restaurants/:id/phones', 'PhoneController').apiOnly()
  .except(['show'])
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth:jwt', 'is:(client)']]
  ]))

// rota de restaurantes favoritos
Route.resource('/user/favorites', 'FavoriteController').apiOnly()
  .except(['show', 'update'])
  .middleware('auth:jwt')
