'use strict'
const Restaurant = use('App/Models/Restaurant')
/**
 * Resourceful controller for interacting with restaurants
 */
class RestaurantController {
  /**
   * Show a list of all restaurants.
   * GET restaurants
   */
  async index ({ response }) {
    try {
      const restaurants = await Restaurant.query()
        .ActiveUser()
        .with('user').fetch()
      return response.send(restaurants)
    } catch (error) {
      return response.status(500).send({ message: `${error}` })
    }
  }

  /**
   * Create/save a new restaurant.
   * POST restaurants
   */
  async store ({ request, auth, response }) {
    const data = request.only([
      'name', 'logo', 'opening_time', 'closing_time', 'delivery', 'delivery_price',
      'payment_card', 'notice', 'latitude', 'longitude', 'city', 'neighborhood', 'street',
      'number', 'complement', 'social_facebook', 'social_instagram'
    ])
    try {
      const restaurant = await Restaurant.create({...data, user_id: auth.user.id})
      return response.status(201).send(restaurant)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }

  /**
   * Display a single restaurant.
   * GET restaurants/:id
   */
  async show ({ params, response }) {
    try {
      const restaurant = await Restaurant.query()
        .where('id', params.id)
        .ActiveUser()
        .with('phones').fetch()
      if (!restaurant.rows.length) {
        return response.status(404).send({ message: 'Not found' })
      }
      return response.status(200).send(restaurant)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Update restaurant details.
   * PUT or PATCH restaurants/:id
   */
  async update ({ params, auth, request, response }) {
    const data = request.only([
      'name', 'logo', 'opening_time', 'closing_time', 'delivery', 'delivery_price',
      'payment_card', 'notice', 'latitude', 'longitude', 'city', 'neighborhood', 'street',
      'number', 'complement', 'social_facebook', 'social_instagram'
    ])
    try {
      const restaurant = await Restaurant.findOrFail(params.id)
      if (restaurant.user_id !== auth.user.id) {
        return response.status(401).send({ message: 'Not authorized' })
      }
      restaurant.merge({...data})
      await restaurant.save()
      return response.status(201).send(restaurant)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Delete a restaurant with id.
   * DELETE restaurants/:id
   */
  async destroy ({ params, auth, response }) {
    try {
      const restaurant = await Restaurant.findOrFail(params.id)
      if (restaurant.user_id !== auth.user.id) {
        return response.status(401).send({ message: `Not authorized` })
      }
      await restaurant.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = RestaurantController
